import {
  CATEGORIES_PART_TYPEID,
  HISTORICAL_DATE_PART_TYPEID,
  KEYWORDS_PART_TYPEID,
  INDEX_KEYWORDS_PART_TYPEID,
  NOTE_PART_TYPEID,
  TOKEN_TEXT_PART_TYPEID,
  TILED_TEXT_PART_TYPEID,
  COMMENT_FRAGMENT_TYPEID,
  BIBLIOGRAPHY_PART_TYPEID,
  CHRONOLOGY_FRAGMENT_TYPEID,
} from '@myrmidon/cadmus-part-general-ui';
import {
  APPARATUS_FRAGMENT_TYPEID,
  ORTHOGRAPHY_FRAGMENT_TYPEID,
  WITNESSES_FRAGMENT_TYPEID,
  QUOTATIONS_FRAGMENT_TYPEID,
} from '@myrmidon/cadmus-part-philology-ui';
import { PartEditorKeys } from '@myrmidon/cadmus-core';
import {
  DOC_REFERENCES_PART_TYPEID,
  PERSON_EVENTS_PART_TYPEID,
  PERSON_PART_TYPEID,
} from '@myrmidon/cadmus-itinera-part-lt-ui';
import {
  MSCOMPOSITION_PART_TYPEID,
  MSSIGNATURES_PART_TYPEID,
  MSPLACE_PART_TYPEID,
  MSQUIRES_PART_TYPEID,
  MSCATCHWORDS_PART_TYPEID,
  MSWATERMARKS_PART_TYPEID,
  MSNUMBERINGS_PART_TYPEID,
  MSPOEM_RANGES_PART_TYPEID,
  MSBINDING_PART_TYPEID,
  MSMATERIAL_DSC_PART_TYPEID,
  MSCONTENTS_PART_TYPEID,
  MSCONTENT_LOCI_PART_TYPEID,
  MSDIMENSIONS_PART_TYPEID,
  MSHANDS_PART_TYPEID,
  MSDECORATIONS_PART_TYPEID,
  MSHISTORY_PART_TYPEID,
} from '@myrmidon/cadmus-itinera-part-ms-ui';

const GENERAL = 'general';
const PHILOLOGY = 'philology';
const ITINERA_LT = 'itinera-lt';
const ITINERA_MS = 'itinera-ms';
const TOKEN_TEXT_LAYER_PART_TYPEID = 'it.vedph.token-text-layer';
const TILED_TEXT_LAYER_PART_TYPEID = 'it.vedph.tiled-text-layer';

/**
 * The parts and fragments editor keys for this UI.
 * Each property is a part type ID, mapped to a value of type PartGroupKey,
 * having a part property with the part's editor key, and a fragments property
 * with the mappings between fragment type IDs and their editor keys.
 */
export const PART_EDITOR_KEYS: PartEditorKeys = {
  [BIBLIOGRAPHY_PART_TYPEID]: {
    part: GENERAL,
  },
  [CATEGORIES_PART_TYPEID]: {
    part: GENERAL,
  },
  [HISTORICAL_DATE_PART_TYPEID]: {
    part: GENERAL,
  },
  [INDEX_KEYWORDS_PART_TYPEID]: {
    part: GENERAL,
  },
  [KEYWORDS_PART_TYPEID]: {
    part: GENERAL,
  },
  [NOTE_PART_TYPEID]: {
    part: GENERAL,
  },
  [TILED_TEXT_PART_TYPEID]: {
    part: GENERAL,
  },
  [TOKEN_TEXT_PART_TYPEID]: {
    part: GENERAL,
  },
  // itinera parts
  [PERSON_PART_TYPEID]: {
    part: ITINERA_LT,
  },
  [PERSON_EVENTS_PART_TYPEID]: {
    part: ITINERA_LT,
  },
  [DOC_REFERENCES_PART_TYPEID]: {
    part: ITINERA_LT,
  },
  [MSSIGNATURES_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSCOMPOSITION_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSPLACE_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSQUIRES_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSCATCHWORDS_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSWATERMARKS_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSNUMBERINGS_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSPOEM_RANGES_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSBINDING_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSMATERIAL_DSC_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSCONTENTS_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSCONTENT_LOCI_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSDIMENSIONS_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSHANDS_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSDECORATIONS_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  [MSHISTORY_PART_TYPEID]: {
    part: ITINERA_MS,
  },
  // layer parts
  [TOKEN_TEXT_LAYER_PART_TYPEID]: {
    part: GENERAL,
    fragments: {
      [CHRONOLOGY_FRAGMENT_TYPEID]: GENERAL,
      [COMMENT_FRAGMENT_TYPEID]: GENERAL,
      [APPARATUS_FRAGMENT_TYPEID]: PHILOLOGY,
      [ORTHOGRAPHY_FRAGMENT_TYPEID]: PHILOLOGY,
      [QUOTATIONS_FRAGMENT_TYPEID]: PHILOLOGY,
      [WITNESSES_FRAGMENT_TYPEID]: PHILOLOGY,
    },
  },
  [TILED_TEXT_LAYER_PART_TYPEID]: {
    part: GENERAL,
    fragments: {
      [CHRONOLOGY_FRAGMENT_TYPEID]: GENERAL,
      [COMMENT_FRAGMENT_TYPEID]: GENERAL,
      [APPARATUS_FRAGMENT_TYPEID]: PHILOLOGY,
      [ORTHOGRAPHY_FRAGMENT_TYPEID]: PHILOLOGY,
      [QUOTATIONS_FRAGMENT_TYPEID]: PHILOLOGY,
      [WITNESSES_FRAGMENT_TYPEID]: PHILOLOGY,
    },
  },
};
