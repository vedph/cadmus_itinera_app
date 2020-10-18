import { Part } from '@myrmidon/cadmus-core';
import { MsCatchword } from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's catchwords part model.
 */
export interface MsCatchwordsPart extends Part {
  catchwords: MsCatchword[];
}

/**
 * The type ID used to identify the MsCatchwordsPart type.
 */
export const MSCATCHWORDS_PART_TYPEID = 'it.vedph.itinera.ms-catchwords';

/**
 * JSON schema for the MsCatchwords part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSCATCHWORDS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' +
    MSCATCHWORDS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'MsCatchwordsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'catchwords',
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
    catchwords: {
      type: 'array',
      additionalItems: true,
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['position'],
            properties: {
              position: {
                type: 'string',
              },
              isVertical: {
                type: 'boolean',
              },
              decoration: {
                type: 'string',
              },
              register: {
                type: 'string',
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
