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
  nr: number;
  rv: string;
  ln?: number;
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
