import {
  DocReference,
  HistoricalDateModel,
  PhysicalSize,
} from '@myrmidon/cadmus-core';

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
  rank?: number;
  ids?: DecoratedId[];
  sources?: DocReference[];
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
  date: HistoricalDateModel;
  textDate?: string;
  sources?: DocReference[];
}

/**
 * A biographic event.
 */
export interface BioEvent {
  type: string;
  date?: HistoricalDateModel;
  places?: string[];
  description?: string;
  sources: DocReference[];
  participants?: DecoratedId[];
  work?: string;
  rank?: number;
  isWorkLost?: boolean;
  externalIds?: string[];
}

/**
 * A literary dedication.
 */
export interface LitDedication {
  title: string;
  date?: HistoricalDateModel;
  dateSent?: HistoricalDateModel;
  participants?: DecoratedId[];
  sources?: DocReference[];
}

/**
 * A correspondent's pseudonym.
 */
export interface CorrPseudonym {
  language: string;
  value: string;
  isAuthor?: boolean;
  sources?: DocReference[];
}

/**
 * An attachment in a letters exchange.
 */
export interface Attachment {
  type: string;
  name: string;
  id?: string;
  externalIds?: string[];
  portion?: string;
  isLost?: boolean;
  isUnknown?: boolean;
  note?: string;
}

/**
 * An exchange between correspondents.
 */
export interface CorrExchange {
  isDubious?: boolean;
  isIndirect?: boolean;
  isFromParticipant?: boolean;
  chronotopes?: Chronotope[];
  participants?: DecoratedId[];
  sources?: DocReference[];
  attachments?: Attachment[];
}

/**
 * Location of a sheet in a manuscript.
 */
export interface MsLocation {
  n: number;
  r?: boolean;
  s?: string;
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
  date?: HistoricalDateModel;
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
  date?: HistoricalDateModel;
}

/**
 * A manuscript's quire.
 */
export interface MsQuire {
  tag?: string;
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
  date?: HistoricalDateModel;
  externalIds?: string[];
}

/**
 * A manuscript's numbering.
 */
export interface MsNumbering {
  isMain?: boolean;
  isPagination?: boolean;
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
  date?: HistoricalDateModel;
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
  ranges?: MsLocationRange[];
  state?: string;
  incipit?: string;
  explicit?: string;
  note?: string;
  units?: MsContentUnit[];
}

/**
 * A content locus relevant for manuscript's analysis.
 */
export interface MsContentLocus {
  citation: string;
  text: string;
  refSheet?: MsLocation;
  imageId?: string;
}

/**
 * A manuscript's rubrication.
 */
export interface MsRubrication {
  ranges: MsLocationRange[];
  type: string;
  description?: string;
  issues?: string;
}

/**
 * A manuscript's subscription.
 */
export interface MsSubscription {
  locations: MsLocation[];
  language: string;
  text?: string;
}

/**
 * A range of manuscript's locations.
 */
export interface MsLocationRange {
  start: MsLocation;
  end: MsLocation;
}

/**
 * Description of a specific manuscript hand's sign.
 */
export interface MsHandSign {
  id: string;
  type: string;
  description?: string;
  imageId?: string;
}

/**
 * A manuscript's hand.
 */
export interface MsHand {
  id: string;
  types: string[];
  personId?: string;
  description: string;
  initials?: string;
  corrections?: string;
  punctuation?: string;
  abbreviations?: string;
  idReason: string;
  ranges: MsLocationRange[];
  extentNote?: string;
  rubrications?: MsRubrication[];
  subscription?: MsSubscription;
  signs?: MsHandSign[];
  imageIds?: string[];
}

/**
 * A manuscript's guide letter.
 */
export interface MsGuideLetter {
  position: string;
  morphology?: string;
}

/**
 * The artist of a manuscript's decoration.
 */
export interface MsDecorationArtist {
  type: string;
  id: string;
  name: string;
  note?: string;
  sources?: DocReference[];
}

/**
 * A decoration in a manuscript.
 */
export interface MsDecoration {
  type: string;
  subject?: string;
  colors: string[];
  tool: string;
  start?: MsLocation;
  end?: MsLocation;
  position?: string;
  size?: PhysicalSize;
  description?: string;
  textRelation?: string;
  guideLetters?: MsGuideLetter[];
  imageId?: string;
  artist?: MsDecorationArtist;
  note?: string;
}

/**
 * A geographical location, expressed as an area plus an
 * optional "address", which contains any number of topographic
 * names separated by commas, from the widest to the narrowest.
 */
export interface GeoAddress {
  area: string;
  address?: string;
}

/**
 * An annotation in a manuscript, used in the manuscript's history.
 */
export interface MsAnnotation {
  language: string;
  type: string;
  text: string;
  start?: MsLocation;
  end?: MsLocation;
  personId?: string;
  sources?: DocReference[];
}

/**
 * A restoration in a manuscript, used in the manuscript's history.
 */
export interface MsRestoration {
  type: string;
  place?: string;
  date?: HistoricalDateModel;
  note?: string;
  personId?: string;
  sources?: DocReference[];
}

/**
 * A person in the history of a manuscript.
 */
export interface MsHistoryPerson {
  id?: string;
  role?: string;
  name: PersonName;
  date?: HistoricalDateModel;
  note?: string;
  externalIds?: string[];
  sources?: DocReference[];
  annotation?: MsAnnotation[];
  restorations?: MsRestoration[];
}

/**
 * A range of alphanumerics.
 */
export interface AlnumRange {
  a: string;
  b?: string;
}
