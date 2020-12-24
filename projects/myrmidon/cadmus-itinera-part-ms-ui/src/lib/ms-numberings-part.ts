import { Part } from '@myrmidon/cadmus-core';
import { MsNumbering } from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's numbering(s) part model.
 */
export interface MsNumberingsPart extends Part {
  numberings: MsNumbering[];
}

/**
 * The type ID used to identify the MsNumberingsPart type.
 */
export const MSNUMBERINGS_PART_TYPEID = 'it.vedph.itinera.ms-numberings';

/**
 * JSON schema for the MsNumberings part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSNUMBERINGS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' +
    MSNUMBERINGS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'MsNumberingsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'numberings',
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
    numberings: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['era', 'system', 'technique', 'century'],
            properties: {
              isMain: {
                type: 'boolean',
              },
              isPagination: {
                type: 'boolean',
              },
              era: {
                type: 'string',
              },
              system: {
                type: 'string',
              },
              technique: {
                type: 'string',
              },
              century: {
                type: 'integer',
              },
              position: {
                type: 'string',
              },
              issues: {
                type: 'string',
              },
            },
          },
        ],
      },
    },
  },
};
