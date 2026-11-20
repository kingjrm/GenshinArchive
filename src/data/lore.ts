import type { LoreConnection } from "../types/archive";

export const connections: LoreConnection[] = [
  // ── Archons & Traveler ───────────────────────────────────────────────────
  { from: "lumine",   label: "TWIN SEPARATED BY THE UNKNOWN GOD",          to: "aether"      },
  { from: "lumine",   label: "COMPANION AND GUIDE",                         to: "paimon"      },
  { from: "venti",    label: "ANEMO ARCHON OF MONDSTADT",                   to: "lumine"      },
  { from: "zhongli",  label: "REX LAPIS · GEO ARCHON",                      to: "lumine"      },
  { from: "shogun",   label: "EI · ELECTRO ARCHON",                         to: "lumine"      },
  { from: "nahida",   label: "LESSER LORD KUSANALI · DENDRO ARCHON",        to: "lumine"      },
  { from: "furina",   label: "FOCALORS · HYDRO ARCHON",                     to: "lumine"      },
  { from: "mavuika",  label: "PYRO ARCHON OF NATLAN",                       to: "lumine"      },
  { from: "venti",    label: "FELLOW ARCHONS · ANCIENT FRIENDSHIP",         to: "zhongli"     },
  { from: "xiao",     label: "FELLOW ARCHON-ADJACENT · KARMIC BURDEN WITNESSED", to: "venti" },

  // ── Khaenri'ah Threads ──────────────────────────────────────────────────
  { from: "lumine",   label: "INVESTIGATES KHAENRI'AH",                     to: "dainsleif"   },
  { from: "dainsleif", label: "GUARDIAN OF KHAENRI'AH · SEEKS MISSING TWIN", to: "aether"    },

  // ── Rex Lapis & Liyue Bonds ─────────────────────────────────────────────
  { from: "zhongli",  label: "REX LAPIS SUMMONED YAKSHA · KARMIC GUARDIAN", to: "xiao"       },
  { from: "zhongli",  label: "THREE THOUSAND YEARS OF SERVICE · QI-LIN ADEPTUS", to: "ganyu" },
  { from: "hutao",    label: "WANGSHENG FUNERAL PARLOR · DIRECTOR AND CONSULTANT", to: "zhongli" },
  { from: "tartaglia", label: "LIYUE CONSPIRACY · OSIAL SCHEME",            to: "zhongli"    },
  { from: "yelan",    label: "INTELLIGENCE OPERATIVE · LIYUE QIXING",       to: "ningguang"  },

  // ── Inazuma Bonds ───────────────────────────────────────────────────────
  { from: "shogun",   label: "ARCHON AND SHRINE MAIDEN · ANCIENT BOND",     to: "yae-miko"   },
  { from: "shogun",   label: "ABSOLUTE LOYALTY · TENGU GENERAL",            to: "sara"        },
  { from: "kazuha",   label: "VISION HUNT DECREE · FALLEN FRIEND'S BLADE",  to: "shogun"     },
  { from: "wanderer", label: "DISCARDED PUPPET · ELECTRO ARCHON'S CREATION", to: "shogun"    },

  // ── Sumeru Bonds ────────────────────────────────────────────────────────
  { from: "nahida",   label: "ARCHON AND SCRIBE · SUMERU LIBERATION",       to: "alhaitham"  },
  { from: "wanderer", label: "REFORMED WANDERER · DENDRO ARCHON'S ALLY",    to: "nahida"     },
  { from: "tighnari", label: "RANGER MENTOR AND STUDENT · SUMERU FOREST",   to: "collei"     },

  // ── Fontaine Bonds ──────────────────────────────────────────────────────
  { from: "furina",   label: "FIVE HUNDRED YEARS OF PERFORMANCE · SOVEREIGN RESTORED", to: "neuvillette" },
  { from: "furina",   label: "ARCHON MEETING · POST-PROPHECY BOND",         to: "nahida"     },
  { from: "navia",    label: "SPINA DI ROSULA AND CHAMPION DUELIST · FONTAINE ALLIES", to: "clorinde" },
  { from: "wriothesley", label: "MEROPIDE DUKE AND INFIRMARY NURSE",        to: "sigewinne"  },

  // ── Natlan Bonds ────────────────────────────────────────────────────────
  { from: "mavuika",  label: "PYRO ARCHON AND NIGHT-WIND MASTER",           to: "citlali"    },
  { from: "mavuika",  label: "SACRED FLAME AND HUNTER CONTRACT",             to: "kinich"     },

  // ── Fatui Hierarchy ─────────────────────────────────────────────────────
  { from: "tsaritsa", label: "GNOSIS MISSION · ELEVENTH HARBINGER",         to: "tartaglia"  },
  { from: "tsaritsa", label: "CRYO ARCHON AND FOURTH HARBINGER",            to: "arlecchino" },
  { from: "arlecchino", label: "HOUSE OF THE HEARTH · MOTHER AND CHILDREN", to: "lyney"     },
  { from: "arlecchino", label: "HOUSE OF THE HEARTH · MOTHER AND CHILDREN", to: "lynette"   },
  { from: "arlecchino", label: "HOUSE OF THE HEARTH · MOTHER AND CHILDREN", to: "freminet"  },

  // ── Nod-Krai & Moon Threads ─────────────────────────────────────────────
  { from: "lauma",    label: "FROSTMOON SCIONS · NOD-KRAI",                 to: "flins"      },
  { from: "lauma",    label: "FROSTMOON SCIONS · MOON-LINKED HARBINGER",    to: "columbina"  },
  { from: "columbina", label: "THIRD HARBINGER · MOON-LINKED OPERATIVE",   to: "tsaritsa"   },

  // ── Regional Allies & Bonds ─────────────────────────────────────────────
  { from: "albedo",   label: "CHIEF ALCHEMIST AND ASSISTANT · KHEMIA RESEARCH", to: "sucrose" },
  { from: "fischl",   label: "OZ'S MYSTERY · WOLVENDOM ENCOUNTER",          to: "razor"      },
  { from: "tartaglia", label: "FATUI HARBINGER",                             to: "arlecchino" },
];
