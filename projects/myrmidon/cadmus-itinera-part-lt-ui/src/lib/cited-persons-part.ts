import { Part } from '@myrmidon/cadmus-core';
import { CitedPerson } from '@myrmidon/cadmus-itinera-core';

/**
 * The cited persons part model.
 */
export interface CitedPersonsPart extends Part {
  persons: CitedPerson[];
}

/**
 * The type ID used to identify the CitedPersonsPart type.
 */
export const CITED_PERSONS_PART_TYPEID = 'it.vedph.itinera.cited-persons';

/**
 * JSON schema for the CitedPersons part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const CITED_PERSONS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/lt/' +
    CITED_PERSONS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'CitedPersonsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'persons',
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

    persons: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['name'],
            properties: {
              name: {
                type: 'object',
                required: ['language', 'parts'],
                properties: {
                  language: {
                    type: 'string',
                  },
                  tag: {
                    type: 'string',
                  },
                  parts: {
                    type: 'array',
                    items: {
                      anyOf: [
                        {
                          type: 'object',
                          required: ['type', 'value'],
                          properties: {
                            type: {
                              type: 'string',
                            },
                            value: {
                              type: 'string',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
              ids: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'string',
                    },
                  ],
                },
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
