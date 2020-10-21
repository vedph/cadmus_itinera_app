import { HistoricalDate } from '@myrmidon/cadmus-core';

/**
 * A part of a PersonName.
 */
export interface PersonNamePart {
  type: string;
  value: string;
}

/**
 * A person name.
 */
export interface PersonName {
  language: string;
  tag?: string;
  parts: PersonNamePart[];
}

/**
 * A document reference, usually including an author and a work.
 */
export interface DocReference {
  tag?: string;
  author: string;
  work: string;
  location?: string;
  note?: string;
}

/**
 * A count decorated with the ID of the thing being counted,
 * and eventually with a short note.
 */
export interface DecoratedCount {
  id: string;
  value: number;
  note?: string;
}

/**
 * An ID optionally decorated with rank, tag, and sources.
 */
export interface DecoratedId {
  id: string;
  rank?: number;
  tag?: string;
  sources?: DocReference[];
}

/**
 * A person cited in a documental source, optionally with a set of
 * proposed identifications.
 */
export interface CitedPerson {
  name: PersonName;
  ids?: DecoratedId[];
}

/**
 * A place cited in a documental source.
 */
export interface CitedPlace {
  name: string;
  isUnsure?: boolean;
  sources?: DocReference[];
}

/**
 * Chronotopic coordinates: a place with a date.
 */
export interface Chronotope {
  tag?: string;
  place: string;
  date: HistoricalDate;
  textDate?: string;
  sources?: DocReference[];
}

/**
 * Location of a sheet in a manuscript.
 */
export interface MsLocation {
  n: number;
  v: string;
  l?: number;
}

/**
 * A manuscript's signature.
 */
export interface MsSignature {
  tag?: string;
  city: string;
  library: string;
  fund?: string;
  location: string;
}

/**
 * A manuscript's guard sheet.
 */
export interface MsGuardSheet {
  isBack: boolean;
  material: string;
  location: MsLocation;
  date?: HistoricalDate;
  note?: string;
}

/**
 * A section of a manuscript.
 */
export interface MsSection {
  tag?: string;
  label: string;
  start: MsLocation;
  end: MsLocation;
  date?: HistoricalDate;
}

/**
 * A manuscript's quire.
 */
export interface MsQuire {
  isMain?: boolean;
  startNr: number;
  endNr: number;
  sheetCount: number;
  sheetDelta?: number;
  note?: string;
}

/**
 * A manuscript's catchword.
 */
export interface MsCatchword {
  position: string;
  isVertical?: boolean;
  decoration?: string;
  register?: string;
  note?: string;
}

/**
 * A manuscript's watermark.
 */
export interface MsWatermark {
  subject: string;
  similarityRank?: number;
  description?: string;
  place?: string;
  date?: HistoricalDate;
  externalIds?: string[];
}

/**
 * A manuscript's numbering.
 */
export interface MsNumbering {
  isMain?: boolean;
  era: string;
  system: string;
  technique: string;
  century: number;
  position?: string;
  issues?: string;
}

/**
 * A palimpsest sheet of a manuscript.
 */
export interface MsPalimpsest {
  location: MsLocation;
  date?: HistoricalDate;
  note?: string;
}

/**
 * A unit of content inside a MsContent.
 */
export interface MsContentUnit {
  label: string;
  incipit?: string;
  explicit?: string;
}

/**
 * A content section of a manuscript.
 */
export interface MsContent {
  author?: string;
  claimedAuthor?: string;
  work: string;
  start?: MsLocation;
  end?: MsLocation;
  state?: string;
  note?: string;
  units?: MsContentUnit[];
}

/**
 * A content locus relevant for manuscript's analysis.
 */
export interface MsContentLocus {
  citation: string;
  text: string;
}

/**
 * A range of alphanumerics.
 */
export interface AlnumRange {
  a: string;
  b?: string;
}

/**
 * A physical dimension value.
 */
export interface PhysicalDimension {
  tag?: string;
  value: number;
  unit: string;
}

/**
 * A physical 1D, 2D or 3D size.
 */
export interface PhysicalSize {
  tag?: string;
  w?: PhysicalDimension;
  h?: PhysicalDimension;
  d?: PhysicalDimension;
  note?: string;
}
