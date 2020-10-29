import { Part } from '@myrmidon/cadmus-core';
import { CorrPseudonym } from '@myrmidon/cadmus-itinera-core';

/**
 * The correspondent's pseudonyms part model.
 */
export interface CorrPseudonymsPart extends Part {
  pseudonyms: CorrPseudonym[];
}

/**
 * The type ID used to identify the CorrPseudonymsPart type.
 */
export const CORR_PSEUDONYMS_PART_TYPEID = 'it.vedph.itinera.corr-pseudonyms';

/**
 * JSON schema for the CorrPseudonyms part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const CORR_PSEUDONYMS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/lt/' +
    CORR_PSEUDONYMS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'CorrPseudonymsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'pseudonyms',
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
    pseudonyms: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['language', 'value'],
            properties: {
              language: {
                type: 'string',
              },
              value: {
                type: 'string',
              },
              isAuthor: {
                type: 'boolean',
              },
              sources: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['author', 'work'],
                      properties: {
                        tag: {
                          type: 'string',
                        },
                        author: {
                          type: 'string',
                        },
                        work: {
                          type: 'string',
                        },
                        location: {
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
          },
        ],
      },
    },
  },
};
