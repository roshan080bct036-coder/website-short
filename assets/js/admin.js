(function () {
  "use strict";

  var STORAGE_KEY = "portfolioDraft";
  var SECTIONS = [
    { id: "overview", label: "Overview", title: "Your portfolio", description: "Update the details visitors see first, then move through each section of the site." },
    { id: "about", label: "About", title: "About and background", description: "Shape the biography, education, training, and academic appointments." },
    { id: "research", label: "Research", title: "Research", description: "Edit research themes, fieldwork languages, and selected projects." },
    { id: "publications", label: "Publications", title: "Publications", description: "Search, update, add, and remove entries from the publication list." },
    { id: "teaching", label: "Teaching", title: "Teaching", description: "Update the teaching statement and the areas taught." },
    { id: "contact", label: "Contact", title: "Contact and profiles", description: "Keep contact details and academic profile links current." },
    { id: "appearance", label: "Appearance", title: "Appearance and layout", description: "Adjust the portrait, colors, section names, navigation, and which sections are visible." }
  ];
  var SECTION_IDS = ["about", "research", "fieldwork", "projects", "publications", "teaching", "contact"];
  var root = window.SITE || {};
  var original = clone(root);
  var state = loadDraft() || clone(original);
  var activeSection = "overview";
  var activePublication = 0;
  var publicationQuery = "";
  var undoStack = [];
  var fieldCounter = 0;
  var previewTimer = 0;
  var $ = function (selector, context) { return (context || document).querySelector(selector); };
  var make = function (tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    return element;
  };

  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function loadDraft() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      var parsed = JSON.parse(saved);
      return parsed && typeof parsed === "object" && Array.isArray(parsed.publications) ? parsed : null;
    } catch (error) { return null; }
  }

  function getPath(path) {
    return path.split(".").reduce(function (value, key) { return value == null ? undefined : value[key]; }, state);
  }

  function setPath(path, value) {
    var parts = path.split(".");
    var target = state;
    for (var i = 0; i < parts.length - 1; i += 1) {
      if (!target[parts[i]] || typeof target[parts[i]] !== "object") target[parts[i]] = {};
      target = target[parts[i]];
    }
    target[parts[parts.length - 1]] = value;
    saveDraft();
    queuePreview();
  }

  function checkpoint() {
    undoStack.push(clone(state));
    if (undoStack.length > 25) undoStack.shift();
    $("#undoButton").disabled = false;
  }

  function saveDraft() {
    var status = $("#saveStatus");
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      status.classList.remove("is-error");
      status.lastElementChild.textContent = "Saved on this device";
    } catch (error) {
      status.classList.add("is-error");
      status.lastElementChild.textContent = "Storage full; export a backup";
    }
    $("#adminName").textContent = state.name || "Website editor";
  }

  function queuePreview() {
    window.clearTimeout(previewTimer);
    previewTimer = window.setTimeout(function () {
      var frame = $("#sitePreview");
      frame.src = "index.html?draftPreview=" + Date.now();
    }, 350);
  }

  function heading(container, id) {
    var item = SECTIONS.find(function (section) { return section.id === id; });
    var header = make("header", "editor-heading");
    var eyebrow = make("p", "editor-heading__eyebrow", "SITE CONTENT / " + item.label);
    var title = make("h1", "", item.title);
    var description = make("p", "", item.description);
    header.append(eyebrow, title, description);
    container.appendChild(header);
  }

  function subhead(container, text) { container.appendChild(make("h2", "editor-subhead", text)); }
  function rule(container) { container.appendChild(make("hr", "section-rule")); }

  function field(container, label, value, options) {
    options = options || {};
    var wrap = make("div", "admin-field" + (options.wide ? " admin-field--wide" : ""));
    if (options.type === "checkbox") {
      var checkLabel = make("label", "admin-field__check");
      var check = document.createElement("input");
      check.type = "checkbox";
      check.checked = Boolean(value);
      check.addEventListener("focus", checkpoint, { once: true });
      check.addEventListener("change", function () { options.onChange(check.checked); });
      checkLabel.append(check, make("span", "", label));
      wrap.appendChild(checkLabel);
      container.appendChild(wrap);
      return wrap;
    }

    var controlId = "adminField" + (++fieldCounter);
    var labelElement = make("label", "admin-field__label", label);
    labelElement.htmlFor = controlId;
    if (options.hint) labelElement.appendChild(make("span", "admin-field__hint", options.hint));
    var control;
    if (options.type === "textarea") {
      control = document.createElement("textarea");
      if (options.long) control.classList.add("admin-field__textarea--long");
    } else if (options.type === "select") {
      control = document.createElement("select");
      options.options.forEach(function (option) {
        var optionNode = make("option", "", option.label);
        optionNode.value = option.value;
        control.appendChild(optionNode);
      });
    } else {
      control = document.createElement("input");
      control.type = options.type || "text";
    }
    control.id = controlId;
    control.value = value == null ? "" : value;
    if (options.placeholder) control.placeholder = options.placeholder;
    if (options.min != null) control.min = options.min;
    if (options.step != null) control.step = options.step;
    if (options.type === "color") control.setAttribute("aria-label", label);
    control.addEventListener("focus", checkpoint, { once: true });
    control.addEventListener("input", function () {
      var next = options.type === "number" ? Number(control.value) : control.value;
      options.onChange(next);
    });
    wrap.append(labelElement, control);
    container.appendChild(wrap);
    return wrap;
  }

  function colorField(container, label, path) {
    var wrap = make("div", "admin-field");
    var pickerId = "adminColor" + (++fieldCounter);
    var labelElement = make("label", "admin-field__label", label);
    labelElement.htmlFor = pickerId;
    var controls = make("div", "color-control");
    var picker = document.createElement("input");
    picker.type = "color";
    picker.id = pickerId;
    var text = document.createElement("input");
    text.type = "text";
    text.value = getPath(path) || "#000000";
    picker.value = /^#[0-9a-f]{6}$/i.test(text.value) ? text.value : "#000000";
    picker.setAttribute("aria-label", label + " color picker");
    text.setAttribute("aria-label", label + " hex value");
    picker.addEventListener("focus", checkpoint, { once: true });
    text.addEventListener("focus", checkpoint, { once: true });
    picker.addEventListener("input", function () { text.value = picker.value; setPath(path, picker.value); });
    text.addEventListener("input", function () {
      if (/^#[0-9a-f]{6}$/i.test(text.value)) {
        picker.value = text.value;
        setPath(path, text.value);
      }
    });
    controls.append(picker, text);
    wrap.append(labelElement, controls);
    container.appendChild(wrap);
  }

  function makeFieldGrid(parent) {
    var grid = make("div", "field-grid");
    parent.appendChild(grid);
    return grid;
  }

  function objectList(parent, path, fields, defaults, options) {
    options = options || {};
    var items = getPath(path) || [];
    var list = make("div", "repeat-list");
    items.forEach(function (item, index) {
      var row = make("div", "repeat-row");
      var top = make("div", "repeat-row__head");
      var first = fields[0];
      top.appendChild(make("span", "repeat-row__title", (index + 1) + " / " + (item[first.key] || first.label)));
      addRowAction(top, "↑", "Move up", index, path, -1, items.length);
      addRowAction(top, "↓", "Move down", index, path, 1, items.length);
      addRowAction(top, "×", "Remove", index, path, 0, items.length, true);
      row.appendChild(top);
      var grid = makeFieldGrid(row);
      fields.forEach(function (config) {
        var fieldPath = path + "." + index + "." + config.key;
        var wrapper = field(grid, config.label, item[config.key], {
          type: config.type,
          options: config.options,
          wide: config.wide,
          long: config.long,
          onChange: function (value) { setPath(fieldPath, value); }
        });
        if (config.type === "checkbox") wrapper.classList.toggle("admin-field--wide", Boolean(config.wide));
      });
      list.appendChild(row);
    });
    if (!items.length) list.appendChild(make("p", "empty-state", options.empty || "No entries yet."));
    parent.appendChild(list);
    var add = make("button", "add-row", "+  " + (options.addLabel || "Add entry"));
    add.type = "button";
    add.addEventListener("click", function () {
      checkpoint();
      var next = (getPath(path) || []).slice();
      next.push(clone(defaults));
      setPath(path, next);
      renderEditor();
    });
    parent.appendChild(add);
  }

  function addRowAction(parent, symbol, label, index, path, direction, length, remove) {
    var button = make("button", "row-action" + (remove ? " row-action--delete" : ""), symbol);
    button.type = "button";
    button.title = label;
    button.setAttribute("aria-label", label + " entry " + (index + 1));
    button.disabled = !remove && (direction < 0 ? index === 0 : index === length - 1);
    button.addEventListener("click", function () {
      checkpoint();
      var items = (getPath(path) || []).slice();
      if (remove) items.splice(index, 1);
      else {
        var target = index + direction;
        var displaced = items[target];
        items[target] = items[index];
        items[index] = displaced;
      }
      setPath(path, items);
      renderEditor();
    });
    parent.appendChild(button);
  }

  function stringList(parent, path, label, options) {
    options = options || {};
    var items = getPath(path) || [];
    var list = make("div", "repeat-list");
    items.forEach(function (value, index) {
      var row = make("div", "repeat-row repeat-row--compact");
      var top = make("div", "repeat-row__head");
      top.appendChild(make("span", "repeat-row__title", label + " " + (index + 1)));
      addRowAction(top, "↑", "Move up", index, path, -1, items.length);
      addRowAction(top, "↓", "Move down", index, path, 1, items.length);
      addRowAction(top, "×", "Remove", index, path, 0, items.length, true);
      row.appendChild(top);
      var control = document.createElement(options.multiline ? "textarea" : "input");
      if (!options.multiline) control.type = "text";
      control.value = value;
      if (options.multiline) control.classList.add("admin-field__textarea--long");
      control.setAttribute("aria-label", label + " " + (index + 1));
      control.addEventListener("focus", checkpoint, { once: true });
      control.addEventListener("input", function () {
        var next = (getPath(path) || []).slice();
        next[index] = control.value;
        setPath(path, next);
      });
      row.appendChild(control);
      list.appendChild(row);
    });
    if (!items.length) list.appendChild(make("p", "empty-state", options.empty || "No entries yet."));
    parent.appendChild(list);
    var add = make("button", "add-row", "+  Add " + label.toLowerCase());
    add.type = "button";
    add.addEventListener("click", function () {
      checkpoint();
      setPath(path, (getPath(path) || []).concat([""]));
      renderEditor();
    });
    parent.appendChild(add);
  }

  function renderOverview(container) {
    var strip = make("div", "summary-strip");
    [
      [String((state.publications || []).length), "Publications"],
      [String((state.languageGroups || []).reduce(function (sum, group) { return sum + group.items.length; }, 0)), "Languages"],
      [String((state.projects || []).length), "Projects"]
    ].forEach(function (item) {
      var block = make("div", "summary-strip__item");
      block.append(make("span", "summary-strip__value", item[0]), make("span", "summary-strip__label", item[1]));
      strip.appendChild(block);
    });
    container.appendChild(strip);
    var grid = makeFieldGrid(container);
    field(grid, "Name", state.name, { onChange: function (value) { setPath("name", value); } });
    field(grid, "Professional role", state.role, { onChange: function (value) { setPath("role", value); } });
    field(grid, "Name in Devanagari", state.nameDevanagari, { onChange: function (value) { setPath("nameDevanagari", value); } });
    field(grid, "Google Scholar URL", state.scholarUrl, { type: "url", wide: true, onChange: function (value) { setPath("scholarUrl", value); } });
    field(grid, "Introduction", state.tagline, { type: "textarea", wide: true, onChange: function (value) { setPath("tagline", value); } });
    subhead(container, "Research profile at a glance");
    objectList(container, "metrics", [
      { key: "value", label: "Value" }, { key: "label", label: "Label" }
    ], { value: "", label: "" }, { addLabel: "Add statistic" });
    var note = makeFieldGrid(container);
    field(note, "Note below statistics", state.metricsNote, { wide: true, onChange: function (value) { setPath("metricsNote", value); } });
  }

  function renderAbout(container) {
    subhead(container, "Biography");
    stringList(container, "about", "Paragraph", { multiline: true });
    rule(container);
    subhead(container, "Education");
    objectList(container, "education", [
      { key: "title", label: "Degree" }, { key: "org", label: "Institution" }, { key: "year", label: "Year" }
    ], { title: "", org: "", year: "" }, { addLabel: "Add qualification" });
    rule(container);
    subhead(container, "Training and field methods");
    objectList(container, "training", [
      { key: "title", label: "Training" }, { key: "org", label: "Institution" }, { key: "year", label: "Year" }
    ], { title: "", org: "", year: "" }, { addLabel: "Add training" });
    rule(container);
    subhead(container, "Academic appointments");
    objectList(container, "appointments", [
      { key: "title", label: "Position" }, { key: "org", label: "Institution" }, { key: "year", label: "Dates" }
    ], { title: "", org: "", year: "" }, { addLabel: "Add appointment" });
  }

  function renderResearch(container) {
    subhead(container, "Research themes");
    objectList(container, "research", [
      { key: "title", label: "Theme" }, { key: "body", label: "Description", type: "textarea", wide: true }
    ], { title: "", body: "" }, { addLabel: "Add research theme" });
    rule(container);
    subhead(container, "Fieldwork introduction");
    var intro = makeFieldGrid(container);
    field(intro, "Short introduction", state.fieldworkIntro, { type: "textarea", wide: true, onChange: function (value) { setPath("fieldworkIntro", value); } });
    rule(container);
    subhead(container, "Languages and language groups");
    var groups = state.languageGroups || [];
    groups.forEach(function (group, index) {
      var block = make("section", "repeat-row");
      var top = make("div", "repeat-row__head");
      top.appendChild(make("span", "repeat-row__title", "LANGUAGE GROUP " + (index + 1)));
      addRowAction(top, "↑", "Move up", index, "languageGroups", -1, groups.length);
      addRowAction(top, "↓", "Move down", index, "languageGroups", 1, groups.length);
      addRowAction(top, "×", "Remove", index, "languageGroups", 0, groups.length, true);
      block.appendChild(top);
      var labelGrid = makeFieldGrid(block);
      field(labelGrid, "Group name", group.label, { wide: true, onChange: function (value) { setPath("languageGroups." + index + ".label", value); } });
      objectList(block, "languageGroups." + index + ".items", [
        { key: "name", label: "Language" }, { key: "note", label: "Work", type: "textarea", wide: true }
      ], { name: "", note: "" }, { addLabel: "Add language" });
      container.appendChild(block);
    });
    var addGroup = make("button", "add-row", "+  Add language group");
    addGroup.type = "button";
    addGroup.addEventListener("click", function () {
      checkpoint();
      setPath("languageGroups", (state.languageGroups || []).concat([{ label: "", items: [] }]));
      renderEditor();
    });
    container.appendChild(addGroup);
    rule(container);
    subhead(container, "Fieldwork regions");
    stringList(container, "regions", "Region");
    rule(container);
    subhead(container, "Selected projects");
    objectList(container, "projects", [
      { key: "years", label: "Years" }, { key: "title", label: "Project title" },
      { key: "org", label: "Institution or collaborators", type: "textarea", wide: true },
      { key: "body", label: "Description", type: "textarea", wide: true }
    ], { years: "", title: "", org: "", body: "" }, { addLabel: "Add project" });
  }

  function renderPublications(container) {
    var toolbar = make("div", "publication-toolbar");
    toolbar.appendChild(make("p", "editor-help", (state.publications || []).length + " entries in the public list"));
    var add = make("button", "add-row", "+ Add publication");
    add.type = "button";
    add.addEventListener("click", function () {
      checkpoint();
      state.publications.unshift({ year: new Date().getFullYear(), type: "article", title: "", authors: "", venue: "", cites: 0, featured: false, url: "" });
      activePublication = 0;
      publicationQuery = "";
      saveDraft();
      renderEditor();
    });
    toolbar.appendChild(add);
    container.appendChild(toolbar);

    var columns = make("div", "editor-publications");
    var index = make("div", "publication-index");
    var search = document.createElement("input");
    search.type = "search";
    search.placeholder = "Find a publication";
    search.value = publicationQuery;
    search.setAttribute("aria-label", "Search publications");
    index.appendChild(search);
    var count = make("p", "publication-index__count");
    index.appendChild(count);
    var list = make("div", "publication-index__list");
    index.appendChild(list);
    var detail = make("div", "publication-detail");
    columns.append(index, detail);
    container.appendChild(columns);

    function drawIndex() {
      list.innerHTML = "";
      var entries = state.publications || [];
      var matching = entries.map(function (item, itemIndex) { return { item: item, index: itemIndex }; })
        .filter(function (entry) { return (entry.item.title + " " + entry.item.authors + " " + entry.item.year).toLowerCase().indexOf(publicationQuery.toLowerCase()) >= 0; });
      count.textContent = matching.length + " MATCHING";
      matching.forEach(function (entry) {
        var button = make("button", "publication-choice" + (entry.index === activePublication ? " is-active" : ""));
        button.type = "button";
        button.append(make("span", "publication-choice__year", String(entry.item.year || "No year")), make("span", "publication-choice__title", entry.item.title || "Untitled publication"));
        button.addEventListener("click", function () { activePublication = entry.index; drawIndex(); drawDetail(); });
        list.appendChild(button);
      });
      if (!matching.length) list.appendChild(make("p", "empty-state", "No matching publications."));
    }

    function drawDetail() {
      detail.innerHTML = "";
      var entry = (state.publications || [])[activePublication];
      if (!entry) { detail.appendChild(make("p", "empty-state", "Select a publication to edit.")); return; }
      var grid = makeFieldGrid(detail);
      var fields = [
        { key: "year", label: "Year", type: "number" },
        { key: "type", label: "Type", type: "select", options: [
          { value: "book", label: "Book / dictionary" }, { value: "article", label: "Article / chapter" },
          { value: "report", label: "Report / survey" }, { value: "conference", label: "Conference paper" }
        ] },
        { key: "title", label: "Title", type: "textarea", wide: true },
        { key: "authors", label: "Authors", type: "textarea", wide: true },
        { key: "venue", label: "Journal, publisher, or venue", type: "textarea", wide: true },
        { key: "url", label: "Publication link", type: "url", wide: true },
        { key: "cites", label: "Citations", type: "number" },
        { key: "featured", label: "Show in selected publications", type: "checkbox", wide: true }
      ];
      fields.forEach(function (config) {
        field(grid, config.label, entry[config.key], {
          type: config.type, options: config.options, wide: config.wide,
          onChange: function (value) { setPath("publications." + activePublication + "." + config.key, value); }
        });
      });
      var remove = make("button", "publication-delete", "Remove this publication");
      remove.type = "button";
      remove.addEventListener("click", function () {
        checkpoint();
        state.publications.splice(activePublication, 1);
        activePublication = Math.max(0, activePublication - 1);
        saveDraft();
        renderEditor();
      });
      detail.appendChild(remove);
    }

    search.addEventListener("input", function () { publicationQuery = search.value; drawIndex(); });
    drawIndex();
    drawDetail();
  }

  function renderTeaching(container) {
    subhead(container, "Teaching and supervision");
    var grid = makeFieldGrid(container);
    field(grid, "Teaching statement", state.teaching, { type: "textarea", long: true, wide: true, onChange: function (value) { setPath("teaching", value); } });
    rule(container);
    subhead(container, "Areas taught");
    stringList(container, "teachingAreas", "Teaching area");
  }

  function renderContact(container) {
    subhead(container, "Contact details");
    var grid = makeFieldGrid(container);
    field(grid, "Email address", state.contact.email, { type: "email", wide: true, onChange: function (value) { setPath("contact.email", value); } });
    subhead(container, "Postal address");
    stringList(container, "contact.address", "Address line");
    rule(container);
    subhead(container, "Profiles and external links");
    objectList(container, "contact.links", [
      { key: "label", label: "Link name" }, { key: "url", label: "URL", type: "url", wide: true }
    ], { label: "", url: "" }, { addLabel: "Add profile link" });
  }

  function renderAppearance(container) {
    subhead(container, "Portrait photo");
    var upload = make("div", "upload-control");
    var current = make("img", "upload-control__preview");
    current.alt = "Current portfolio portrait preview";
    current.src = state.portraitUrl || "";
    var file = document.createElement("input");
    file.type = "file";
    file.accept = "image/*";
    file.setAttribute("aria-label", "Choose a new portrait image");
    file.addEventListener("focus", checkpoint, { once: true });
    file.addEventListener("change", function () {
      var selected = file.files && file.files[0];
      if (!selected || !selected.type.match(/^image\//)) return;
      var image = new Image();
      image.onload = function () {
        var maxWidth = 960;
        var scale = Math.min(1, maxWidth / image.width);
        var canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        setPath("portraitUrl", canvas.toDataURL("image/jpeg", .84));
        current.src = state.portraitUrl;
      };
      image.src = URL.createObjectURL(selected);
    });
    upload.append(current, file);
    container.appendChild(upload);
    var portraitUrl = makeFieldGrid(container);
    field(portraitUrl, "Portrait image URL", state.portraitUrl, { type: "url", wide: true, onChange: function (value) { setPath("portraitUrl", value); current.src = value; } });

    rule(container);
    subhead(container, "Color palette");
    container.appendChild(make("p", "editor-help", "Choose colors for the portfolio's light theme. The live preview updates as you edit."));
    var colors = makeFieldGrid(container);
    [
      ["Accent", "appearance.accent"], ["Accent hover", "appearance.accentHover"],
      ["Page background", "appearance.paper"], ["Tinted section", "appearance.surface"],
      ["Main text", "appearance.ink"], ["Body text", "appearance.inkMuted"],
      ["Subtle text", "appearance.inkSubtle"], ["Dividers", "appearance.border"]
    ].forEach(function (item) { colorField(colors, item[0], item[1]); });

    rule(container);
    subhead(container, "Section headings");
    var titles = makeFieldGrid(container);
    [
      ["About", "about"], ["Research", "research"], ["Fieldwork", "fieldwork"],
      ["Projects", "projects"], ["Publications", "publications"], ["Teaching", "teaching"],
      ["Contact", "contact"], ["Education heading", "education"],
      ["Training heading", "training"], ["Appointments heading", "appointments"]
    ].forEach(function (item) {
      field(titles, item[0], getPath("sectionTitles." + item[1]), {
        onChange: function (value) { setPath("sectionTitles." + item[1], value); }
      });
    });

    rule(container);
    subhead(container, "Buttons and publication labels");
    var copyGrid = makeFieldGrid(container);
    [
      ["Hero publications button", "viewPublications"], ["Scholar profile button", "heroScholar"],
      ["Full publications link", "fullScholar"], ["Show all publications", "showAll"],
      ["Show selected only", "showSelected"], ["All filter", "filterAll"],
      ["Books filter", "filterBooks"], ["Articles filter", "filterArticles"],
      ["Reports filter", "filterReports"], ["Conference filter", "filterConference"]
    ].forEach(function (item) {
      field(copyGrid, item[0], getPath("copy." + item[1]), {
        onChange: function (value) { setPath("copy." + item[1], value); }
      });
    });

    rule(container);
    subhead(container, "Navigation labels and order");
    objectList(container, "navigation", [
      { key: "label", label: "Label" },
      { key: "id", label: "Section", type: "select", options: SECTION_IDS.map(function (id) { return { value: id, label: id.charAt(0).toUpperCase() + id.slice(1) }; }) }
    ], { id: "about", label: "About" }, { addLabel: "Add navigation link" });

    rule(container);
    subhead(container, "Show or hide sections");
    var visibilityList = make("div", "visibility-list");
    SECTION_IDS.forEach(function (id) {
      field(visibilityList, id.charAt(0).toUpperCase() + id.slice(1), state.visibility[id] !== false, {
        type: "checkbox", onChange: function (value) { setPath("visibility." + id, value); }
      });
    });
    field(visibilityList, "Research statistics", state.visibility.metrics !== false, {
      type: "checkbox", onChange: function (value) { setPath("visibility.metrics", value); }
    });
    container.appendChild(visibilityList);

    rule(container);
    subhead(container, "Footer");
    var footer = makeFieldGrid(container);
    field(footer, "Footer note", state.footerNote, { type: "textarea", wide: true, onChange: function (value) { setPath("footerNote", value); } });
  }

  function renderEditor() {
    var container = $("#editorContent");
    container.innerHTML = "";
    heading(container, activeSection);
    if (activeSection === "overview") renderOverview(container);
    else if (activeSection === "about") renderAbout(container);
    else if (activeSection === "research") renderResearch(container);
    else if (activeSection === "publications") renderPublications(container);
    else if (activeSection === "teaching") renderTeaching(container);
    else if (activeSection === "contact") renderContact(container);
    else if (activeSection === "appearance") renderAppearance(container);
  }

  function renderNav() {
    var nav = $("#sectionNav");
    nav.innerHTML = "";
    SECTIONS.forEach(function (section, index) {
      var button = make("button", "section-nav__item" + (section.id === activeSection ? " is-active" : ""));
      button.type = "button";
      button.setAttribute("aria-current", section.id === activeSection ? "page" : "false");
      button.append(make("span", "section-nav__number", String(index + 1).padStart(2, "0")), make("span", "", section.label));
      if (section.id === "publications") button.appendChild(make("span", "section-nav__count", String((state.publications || []).length)));
      button.addEventListener("click", function () { activeSection = section.id; renderNav(); renderEditor(); });
      nav.appendChild(button);
    });
  }

  function download(filename, content, type) {
    var url = URL.createObjectURL(new Blob([content], { type: type }));
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportSiteData() {
    var source = "window.SITE = " + JSON.stringify(state, null, 2) + ";\n";
    download("data.js", source, "text/javascript;charset=utf-8");
  }

  function exportBackup() {
    download("portfolio-backup.json", JSON.stringify(state, null, 2), "application/json;charset=utf-8");
  }

  function importBackup(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var imported = JSON.parse(reader.result);
        if (!imported || typeof imported.name !== "string" || !Array.isArray(imported.publications)) throw new Error("Invalid backup");
        checkpoint();
        state = Object.assign(clone(original), imported);
        saveDraft();
        renderNav();
        renderEditor();
        queuePreview();
      } catch (error) {
        window.alert("That backup could not be read. Choose a portfolio JSON backup file.");
      }
    };
    reader.readAsText(file);
  }

  function bindToolbar() {
    $("#exportButton").addEventListener("click", exportSiteData);
    $("#importButton").addEventListener("click", function () { $("#importFile").click(); });
    $("#importFile").addEventListener("change", function (event) {
      if (event.target.files && event.target.files[0]) importBackup(event.target.files[0]);
      event.target.value = "";
    });
    $("#undoButton").addEventListener("click", function () {
      if (!undoStack.length) return;
      state = undoStack.pop();
      $("#undoButton").disabled = !undoStack.length;
      saveDraft();
      renderNav();
      renderEditor();
      queuePreview();
    });
    Array.prototype.forEach.call(document.querySelectorAll(".preview-mode"), function (button) {
      button.addEventListener("click", function () {
        document.querySelectorAll(".preview-mode").forEach(function (item) {
          var active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        $("#previewStage").classList.toggle("is-mobile", button.dataset.preview === "mobile");
      });
    });
  }

  function addBackupAction() {
    var button = make("button", "button button--quiet", "Export backup");
    button.type = "button";
    button.addEventListener("click", exportBackup);
    $(".topbar__actions").insertBefore(button, $("#exportButton"));
  }

  function boot() {
    bindToolbar();
    addBackupAction();
    saveDraft();
    renderNav();
    renderEditor();
    queuePreview();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();