/* =============================================================================
   data.js - content for the portfolio of Prof. Dr. Dubi Nanda Dhakal
   -----------------------------------------------------------------------------
   Everything editable lives here. To update the site, edit these arrays and
   objects; index.html and main.js read from them. No build step is required.

   Sources compiled Sept 2026 from Google Scholar
   (https://scholar.google.com/citations?user=uSFaQ0oAAAAJ), the Central
   Department of Linguistics faculty page, ResearchGate and LINGUIST List.
   ========================================================================== */

window.SITE = {

  /* ---- Identity -------------------------------------------------------- */
  name: "Dubi Nanda Dhakal",
  nameDevanagari: "दुबिनन्द ढकाल", /* TODO: confirm preferred Devanagari spelling */
  role: "Documentary and descriptive linguist",
  tagline:
    "Two decades documenting the lesser-described Indo-Aryan and Tibeto-Burman languages of Nepal and the Himalaya.",

  /* ---- Metrics band (Google Scholar, September 2026) ------------------- */
  metrics: [
    { value: "299", label: "Citations" },
    { value: "9", label: "h-index" },
    { value: "20+", label: "Languages documented" },
    { value: "17", label: "Books & monographs" }
  ],
  metricsNote: "Citation figures: Google Scholar, September 2026.",

  /* ---- About --------------------------------------------------------------
     Written in the third person, in the style of a faculty profile.        */
  about: [
    "Dubi Nanda Dhakal is a professor of linguistics at the Central Department of Linguistics, Tribhuvan University, and Dean of the university's Faculty of Humanities and Social Sciences. For close to twenty years he has documented the lesser-described Indo-Aryan and Tibeto-Burman languages of Nepal, producing reference grammars, dictionaries and annotated text collections for communities whose languages carry little or no written record.",
    "His work joins sustained fieldwork with descriptive and typological analysis. Recurring threads are morphology, case and agreement systems, adjective and kinship classes, and the structural effects of long-term contact between Nepali and the country's minority languages. More recent projects extend this comparative work into computational phylogenetics, reconstructing the internal history of the South-Western Tibetic languages.",
    "He earned his PhD in linguistics from Tribhuvan University in 2011, following an early appointment as research assistant on the Endangered Languages Documentation Programme's project on Baram. He has prepared language surveys and reference materials for the Language Commission of Nepal, the Nepal Academy, the University Grants Commission and the Centre for Nepal and Asian Studies, and contributes regularly to debate on multilingual and mother-tongue education."
  ],

  education: [
    { title: "PhD, Linguistics", org: "Tribhuvan University", year: "2011" },
    { title: "MA, Linguistics", org: "Tribhuvan University", year: "" },
    { title: "MA, English", org: "Tribhuvan University", year: "" }
  ],

  appointments: [
    { title: "Professor of Linguistics", org: "Central Department of Linguistics, Tribhuvan University", year: "" },
    { title: "Dean, Faculty of Humanities and Social Sciences", org: "Tribhuvan University", year: "" },
    { title: "Research Assistant, LEDBL project", org: "Endangered Languages Documentation Programme, SOAS University of London", year: "2007-2011" }
  ],

  /* ---- Research focus ------------------------------------------------- */
  research: [
    {
      title: "Language documentation",
      body: "Reference grammars, lexicons and annotated text corpora for endangered languages, built together with speaker communities."
    },
    {
      title: "Descriptive and typological morphosyntax",
      body: "Case marking, verb agreement, nominalization and adjective classes across Tibeto-Burman and Indo-Aryan."
    },
    {
      title: "Language contact",
      body: "Contact-induced change between Nepali and minority languages: borrowed morphology, converbs and structural convergence."
    },
    {
      title: "Historical and computational linguistics",
      body: "Phylogenetic reconstruction of Tibetic; the subgrouping of Raji-Raute and of Tamangic varieties."
    },
    {
      title: "Field linguistics",
      body: "Long fieldwork seasons in Manang, Tsum-Nubri, Mustang and the far-western Tarai, with community lexicography."
    },
    {
      title: "Language policy and education",
      body: "Language enumeration and census analysis; multilingual and mother-tongue education in Nepal."
    }
  ],

  /* ---- Fieldwork: languages worked on -------------------------------- */
  fieldworkIntro:
    "Field and descriptive work spanning more than twenty languages, from the Tarai plains to the high valleys of the Nepal Himalaya.",

  languageGroups: [
    {
      label: "Tibeto-Burman and Tibetic",
      items: [
        { name: "Baram", note: "Grammar, dictionary, ethnographic sketch (LEDBL)" },
        { name: "Purbiya Raji", note: "Grammar, lexicon, oral-genre corpus" },
        { name: "Naukule Raji", note: "Grammar, inverse marking" },
        { name: "Gyalsumdo", note: "Grammar, community dictionary" },
        { name: "Tsum", note: "Lexicon, nominal morphology" },
        { name: "Nubri", note: "Lexicon, morphosyntax sketch" },
        { name: "Lowa", note: "Case markers, causatives" },
        { name: "Lhomi", note: "Causative constructions" },
        { name: "Yohlmo", note: "Sketch grammar" },
        { name: "Manang Gurung", note: "Differential argument marking" },
        { name: "Nar", note: "Referential density study" },
        { name: "Surel", note: "Sociolinguistic survey" },
        { name: "Jirel", note: "Sociolinguistic survey" }
      ]
    },
    {
      label: "Indo-Aryan",
      items: [
        { name: "Darai", note: "Grammar, texts, verb agreement" },
        { name: "Majhi", note: "Grammar, analyzed texts" },
        { name: "Bote", note: "Grammar, community dictionary" },
        { name: "Rana Tharu", note: "Grammatical sketch, first dictionary" }
      ]
    },
    {
      label: "Comparative and areal",
      items: [
        { name: "South-Western Tibetic", note: "Computational phylogeny" },
        { name: "Tamangic varieties", note: "Kinship, comparative morphology" },
        { name: "Languages of Manang", note: "Sociolinguistic survey" }
      ]
    }
  ],

  regions: [
    "Manang", "Tsum and Nubri, Gorkha", "Upper Mustang",
    "Chitwan and Nawalparasi", "Far-western Tarai, Kailali-Kanchanpur", "Dolakha"
  ],

  /* ---- Selected projects -------------------------------------------- */
  projects: [
    {
      years: "2007-2011",
      title: "Documentation of Baram",
      org: "Endangered Languages Documentation Programme (ELDP), SOAS University of London",
      body: "Research assistant on the LEDBL project, producing a reference grammar, a trilingual dictionary and an ethnographic sketch of a near-extinct language of Gorkha district."
    },
    {
      years: "2012-2018",
      title: "Languages of Manang",
      org: "Southern Illinois University Edwardsville (with Kristine Hildebrandt)",
      body: "Sociolinguistic survey and comparative morphosyntax of Gyalsumdo, Nar-Phu, Manang Gurung and Nubri, alongside community dictionaries and an archive of recordings."
    },
    {
      years: "2015-2018",
      title: "Narrating the 2015 earthquakes",
      org: "Washington University in St. Louis and Dartmouth (with Geoff Childs, Sienna Craig, Mark Donohue)",
      body: "Participatory documentation of disaster narratives across Himalayan speech communities in the aftermath of the Gorkha earthquake."
    },
    {
      years: "2021-2024",
      title: "Phylogeny of South-Western Tibetic",
      org: "With Johann-Mattis List and Simon Roberts, Journal of Language Evolution",
      body: "Computational subgrouping of Tibetic lects from curated cognate sets, testing contact and inheritance accounts of shared structure."
    }
  ],

  /* ---- Teaching ---------------------------------------------------- */
  teaching:
    "At the Central Department of Linguistics, Dhakal teaches and supervises MA, MPhil and PhD students, and has advised theses on under-described languages of Nepal. He mentors early-career documentary linguists and has led fieldwork training for community researchers.",
  teachingAreas: [
    "Field methods", "Descriptive grammar writing", "Morphology",
    "Linguistic typology", "Language documentation", "Historical linguistics",
    "Sociolinguistic survey", "Lexicography"
  ],

  /* ---- Contact --------------------------------------------------- */
  contact: {
    address: [
      "Central Department of Linguistics",
      "Tribhuvan University",
      "University Campus, Kirtipur",
      "Kathmandu, Nepal"
    ],
    email: "dubinanda.dhakal@fohss.tu.edu.np", /* TODO: confirm current address before publishing */
    links: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=uSFaQ0oAAAAJ&hl=en" },
      { label: "Central Department of Linguistics", url: "https://cdltu.edu.np/dubi-nanda-dhakal/" },
      { label: "ResearchGate", url: "https://www.researchgate.net/profile/Dubi-Dhakal" },
      { label: "Academia.edu", url: "https://independent.academia.edu/DhakalDubinanda" }
    ]
  },

  scholarUrl: "https://scholar.google.com/citations?user=uSFaQ0oAAAAJ&hl=en",

  /* ==================================================================
     PUBLICATIONS
     type: "book"       -> Books, grammars, dictionaries, text collections
           "article"    -> Journal articles and book chapters
           "report"     -> Research reports and language surveys
           "conference" -> Conference and workshop papers
     featured: true      -> shown in the default (collapsed) view
     cites: Google Scholar citation count where non-trivial
     url: only where a stable public link is known
     ================================================================== */
  publications: [
    /* ---------- 2020s ---------- */
    { year: 2026, type: "article",
      title: "Verb agreement in Purbiya Raji",
      authors: "D. N. Dhakal",
      venue: "Gipan 8(1), 17-28" },

    { year: 2025, type: "book",
      title: "Purbiya Raji Grammar",
      authors: "D. N. Dhakal",
      venue: "Manuscript / community edition", featured: true },

    { year: 2025, type: "article",
      title: "Tsum adjectives in areal-typological perspective",
      authors: "D. N. Dhakal",
      venue: "Nepalese Linguistics 29(1), 17-24" },

    { year: 2025, type: "conference",
      title: "Diachronic explanations for exceptional word order patterns: initial polar question markers and OV in Nepali",
      authors: "A. Hölzl and D. N. Dhakal",
      venue: "Syntax of the World's Languages 10, Potsdam" },

    { year: 2025, type: "report",
      title: "Linguistic diversity in Nepal: what we learn from the 2021 census",
      authors: "D. N. Dhakal",
      venue: "Presented at New York University Abu Dhabi" },

    { year: 2024, type: "article",
      title: "A phylogenetic study of South-Western Tibetic",
      authors: "D. N. Dhakal, J.-M. List and S. Roberts",
      venue: "Journal of Language Evolution 9(1-2), 14-28",
      cites: 6, featured: true,
      url: "https://academic.oup.com/jole/article/9/1-2/14/7850294" },

    { year: 2024, type: "article",
      title: "Serial verb constructions in three Tibetan languages",
      authors: "D. N. Dhakal",
      venue: "Gipan 6(1), 81-95", cites: 1 },

    { year: 2024, type: "report",
      title: "Language phylogenies",
      authors: "D. N. Dhakal",
      venue: "Dataset and documentation" },

    { year: 2023, type: "article",
      title: "A sketch of Nubri morphosyntax",
      authors: "D. N. Dhakal",
      venue: "Himalayan linguistics working paper", cites: 4 },

    { year: 2023, type: "article",
      title: "Case markers in Purbiya Raji in comparative perspective",
      authors: "D. N. Dhakal",
      venue: "Nepalese Linguistics 37(1), 19-29", cites: 1 },

    { year: 2023, type: "conference",
      title: "Inverse marking in Naukule Raji",
      authors: "D. N. Dhakal",
      venue: "56th International Conference on Sino-Tibetan Languages and Linguistics, Bangkok" },

    { year: 2022, type: "article",
      title: "A micro-typology of contact effects in four Tibeto-Burman languages",
      authors: "K. A. Hildebrandt, O. Bond and D. N. Dhakal",
      venue: "Journal of Language Contact 15(2), 302-340",
      cites: 3, featured: true },

    { year: 2022, type: "article",
      title: "Tense categories and the polysemous -a in Raji",
      authors: "D. N. Dhakal",
      venue: "Nepalese Linguistics 36(1), 46-52", cites: 2 },

    { year: 2022, type: "article",
      title: "Finite verb forms in Nubri, with a focus on the conjunct-disjunct distinction",
      authors: "D. N. Dhakal",
      venue: "Nepalese Linguistics 41-49", cites: 1 },

    { year: 2021, type: "book",
      title: "Raji Grammar",
      authors: "D. N. Dhakal",
      venue: "Language Commission, Nepal (in Nepali)", featured: true },

    { year: 2021, type: "article",
      title: "The Raji-Raute link explained",
      authors: "D. N. Dhakal",
      venue: "Journal of Nepalese Studies 14(1), 66-91", cites: 3 },

    { year: 2020, type: "book",
      title: "Community-Based Dictionary of Bote",
      authors: "D. N. Dhakal",
      venue: "Gesellschaft für bedrohte Sprachen, Cologne" },

    { year: 2020, type: "article",
      title: "Kinship terms in Gyalsumdo, Nubri and Tsum",
      authors: "D. N. Dhakal",
      venue: "Indian Linguistics 81(3-4), 66-91", cites: 4 },

    /* ---------- 2010s ---------- */
    { year: 2019, type: "book",
      title: "A Raji-English Lexicon",
      authors: "D. N. Dhakal",
      venue: "LINCOM Europa, Munich", cites: 1, featured: true },

    { year: 2019, type: "article",
      title: "Nouns and noun phrase structure in Nubri",
      authors: "D. N. Dhakal",
      venue: "Gipan 4, 38-53", cites: 2 },

    { year: 2019, type: "report",
      title: "Nubri-English-Nepali Dictionary",
      authors: "D. N. Dhakal",
      venue: "Report to the National Foundation for Development of Indigenous Nationalities" },

    { year: 2018, type: "book",
      title: "A Nubri Lexicon",
      authors: "D. N. Dhakal",
      venue: "LINCOM GmbH, Munich", cites: 6, featured: true },

    { year: 2018, type: "article",
      title: "Kinship in three Tamangic varieties",
      authors: "K. A. Hildebrandt, O. Bond and D. N. Dhakal",
      venue: "Linguistics of the Tibeto-Burman Area 41(1), 1-21", cites: 4 },

    { year: 2018, type: "article",
      title: "Morphosyntax of adjectives in Gyalsumdo (Nepal)",
      authors: "D. N. Dhakal",
      venue: "Interdisciplinary Journal of Linguistics 11, 87-96", cites: 2 },

    { year: 2018, type: "report",
      title: "Documentation of oral genres and wordlist of Raji",
      authors: "D. N. Dhakal",
      venue: "Report to the Endangered Language Fund, USA", cites: 3 },

    { year: 2017, type: "book",
      title: "Bote Grammar",
      authors: "D. N. Dhakal",
      venue: "Nepal Academy, Kathmandu", cites: 2 },

    { year: 2017, type: "article",
      title: "Narrating disaster through participatory research: perspectives from post-earthquake Nepal",
      authors: "G. Childs, S. Craig, D. N. Dhakal, M. Donohue and K. Hildebrandt",
      venue: "Collaborative Anthropologies 10(1), 207-236",
      cites: 17, featured: true },

    { year: 2017, type: "article",
      title: "Causative constructions in Lhomi, Gyalsumdo, Nubri and Lowa",
      authors: "D. N. Dhakal",
      venue: "Gipan 3(1)", cites: 4 },

    { year: 2017, type: "article",
      title: "Noun phrase structure in Tsum",
      authors: "D. N. Dhakal",
      venue: "Interdisciplinary Journal of Linguistics 10, 73-84", cites: 4 },

    { year: 2017, type: "article",
      title: "Lowa case markers in comparative perspective",
      authors: "D. N. Dhakal",
      venue: "The Journal of University Grants Commission 6(1), 16-28", cites: 2 },

    { year: 2016, type: "book",
      title: "A Tsum Lexicon",
      authors: "M. Donohue and D. N. Dhakal",
      venue: "LINCOM, Munich", cites: 8, featured: true },

    { year: 2016, type: "book",
      title: "Gyalsumdo: A Community-Based Dictionary",
      authors: "D. N. Dhakal, K. A. Hildebrandt and J. Krim",
      venue: "Centre for Nepal and Asian Studies, Tribhuvan University", cites: 6 },

    { year: 2016, type: "article",
      title: "Diagnosing the contact history for Tsum",
      authors: "D. N. Dhakal, M. Donohue, B. Liu and B. R. Gautam",
      venue: "Nepalese Linguistics 31(1-2), 21-28", cites: 6 },

    { year: 2016, type: "article",
      title: "Nominal inflections in Tsum: an areal-typological perspective",
      authors: "D. N. Dhakal",
      venue: "Tsum inflectional morphology in areal-typological context", cites: 2 },

    { year: 2015, type: "book",
      title: "Rana Tharu-Nepali-English Basic Dictionary, with Nepali and English indices",
      authors: "D. N. Dhakal",
      venue: "LINCOM GmbH, Munich. The first dictionary of the Rana Tharu language",
      featured: true },

    { year: 2015, type: "book",
      title: "Analyzed Texts in Rana Tharu, with a Grammatical Sketch",
      authors: "D. N. Dhakal",
      venue: "LINCOM Europa, Munich", cites: 1 },

    { year: 2015, type: "article",
      title: "A sociolinguistic survey of the languages of Manang, Nepal: co-existence and endangerment",
      authors: "K. A. Hildebrandt, D. N. Dhakal, O. Bond, M. Vallejo and A. Fyffe",
      venue: "Journal of Indigenous Nationalities 14(6)",
      cites: 12, featured: true },

    { year: 2015, type: "article",
      title: "Multilingual education in Nepal: retrospect and prospects",
      authors: "D. N. Dhakal",
      venue: "Education and Development 26, 78-92", cites: 10 },

    { year: 2015, type: "article",
      title: "Darai verb agreement",
      authors: "D. N. Dhakal",
      venue: "Himalayan Linguistics 14(2)", cites: 4 },

    { year: 2015, type: "report",
      title: "Morphology and syntax of Gyalsumdo",
      authors: "D. N. Dhakal",
      venue: "Research report, Centre for Nepal and Asian Studies, Tribhuvan University", cites: 7 },

    { year: 2014, type: "book",
      title: "A Grammar of Majhi",
      authors: "D. N. Dhakal",
      venue: "LINCOM Europa, Munich", cites: 12, featured: true },

    { year: 2014, type: "article",
      title: "Contact-induced changes in Baram",
      authors: "D. N. Dhakal",
      venue: "Northeast Indian Linguistics (NEIL) 6, 167-190", cites: 9 },

    { year: 2014, type: "article",
      title: "Baram: a typological sketch",
      authors: "D. N. Dhakal",
      venue: "Indian Linguistics 75(1-2), 49-63", cites: 3 },

    { year: 2013, type: "book",
      title: "Darai Texts",
      authors: "D. N. Dhakal",
      venue: "Languages of the World / Text Collections 32, LINCOM Europa, Munich", cites: 3 },

    { year: 2013, type: "conference",
      title: "Optional ergative case marking: what can be expressed by its absence",
      authors: "O. Bond, K. Hildebrandt and D. N. Dhakal",
      venue: "10th Biennial Association for Linguistic Typology meeting, Leipzig", cites: 6 },

    { year: 2013, type: "conference",
      title: "Probabilistic case in the languages of Manang",
      authors: "O. Bond, K. A. Hildebrandt and D. N. Dhakal",
      venue: "Cambridge Group for Endangered Languages and Cultures", cites: 4 },

    { year: 2013, type: "report",
      title: "The documentation of Rana Tharu",
      authors: "D. N. Dhakal",
      venue: "Research report, Nepal Academy, Kathmandu", cites: 5 },

    { year: 2013, type: "report",
      title: "A sociolinguistic survey of Jirel",
      authors: "T. R. Kansakar, D. N. Dhakal and S. Sapkota",
      venue: "Central Department of Linguistics, Tribhuvan University" },

    { year: 2012, type: "book",
      title: "Darai Grammar",
      authors: "D. N. Dhakal",
      venue: "LINCOM Europa, Munich", cites: 16, featured: true },

    { year: 2012, type: "article",
      title: "A sketch grammar of Yohlmo",
      authors: "A. M. Hari, Y. P. Yadava and D. N. Dhakal",
      venue: "Himalayan Linguistics 11(1)", cites: 2 },

    /* ---------- 2010-2011 ---------- */
    { year: 2011, type: "book",
      title: "A Grammar of Baram",
      authors: "T. R. Kansakar, Y. P. Yadava, K. P. Chalise, B. Prasain, D. N. Dhakal and K. Paudel",
      venue: "Central Department of Linguistics and LEDBL, Tribhuvan University",
      cites: 28, featured: true },

    { year: 2011, type: "book",
      title: "Baram-Nepali-English Dictionary",
      authors: "T. R. Kansakar, Y. P. Yadava, K. P. Chalise, B. Prasain, D. N. Dhakal and K. Paudel",
      venue: "LEDBL, Central Department of Linguistics, Tribhuvan University", cites: 9 },

    { year: 2011, type: "article",
      title: "A sociolinguistic study of the Baram language",
      authors: "T. R. Kansakar, Y. P. Yadava, K. P. Chalise, B. Prasain, D. N. Dhakal and K. Paudel",
      venue: "Himalayan Linguistics 10(1)", cites: 16 },

    { year: 2010, type: "book",
      title: "An Ethnographic Sketch of the Baram People",
      authors: "Baram documentation team",
      venue: "Central Department of Linguistics and LEDBL, Tribhuvan University (in Nepali)" },

    { year: 2010, type: "article",
      title: "Value of literature in language teaching",
      authors: "D. N. Dhakal",
      venue: "Journal of NELTA 6(1)", cites: 6 }
  ]
};
