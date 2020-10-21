import { Part } from '@myrmidon/cadmus-core';
import { MsQuire } from '@myrmidon/cadmus-itinera-core';

/**
 * The MsQuires part model.
 */
export interface MsQuiresPart extends Part {
  quires: MsQuire[];
}

/**
 * The type ID used to identify the MsQuiresPart type.
 */
export const MSQUIRES_PART_TYPEID = 'it.vedph.itinera.ms-quires';

/**
 * JSON schema for the MsQuires part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSQUIRES_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.vedph.it/cadmus/parts/itinera/ms/' + MSQUIRES_PART_TYPEID + '.json',
  type: 'object',
  title: 'MsQuiresPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'quires',
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
    quires: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['startNr', 'endNr', 'sheetCount'],
            properties: {
              isMain: {
                type: 'boolean',
              },
              startNr: {
                type: 'integer',
              },
              endNr: {
                type: 'integer',
              },
              sheetCount: {
                type: 'integer',
              },
              sheetDelta: {
                type: 'integer',
              },
              note: {
                type: 'string',
              },
            },
          },
        ],
      },
    },
  },
};
