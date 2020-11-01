import { Part } from '@myrmidon/cadmus-core';

/**
 * The letter info part model.
 */
export interface LetterInfoPart extends Part {
  language: string;
  subject: string;
  heading?: string;
  note?: string;
}

/**
 * The type ID used to identify the LetterInfoPart type.
 */
export const LETTER_INFO_PART_TYPEID = 'it.vedph.itinera.letter-info';

/**
 * JSON schema for the LetterInfo part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const LETTER_INFO_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/lt/' + LETTER_INFO_PART_TYPEID + '.json',
  type: 'object',
  title: 'LetterInfoPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'language',
    'subject',
  ],
  properties: {
    timeCreated: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    creatorId: {
      type: 'string',
    },
    timeModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$',
    },
    userId: {
      type: 'string',
    },
    id: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    itemId: {
      type: 'string',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    typeId: {
      type: 'string',
      pattern: '^[a-z][-0-9a-z._]*$',
    },
    roleId: {
      type: ['string', 'null'],
      pattern: '^([a-z][-0-9a-z._]*)?$',
    },
    language: {
      type: 'string',
    },
    subject: {
      type: 'string',
    },
    heading: {
      type: 'string',
    },
    note: {
      type: 'string',
    },
  },
};
