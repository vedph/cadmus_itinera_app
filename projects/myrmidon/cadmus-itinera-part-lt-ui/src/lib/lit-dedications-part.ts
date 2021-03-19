import { Part } from '@myrmidon/cadmus-core';
import { LitDedication } from '@myrmidon/cadmus-itinera-core';

/**
 * The correspondent's dedications part model.
 */
export interface LitDedicationsPart extends Part {
  dedications: LitDedication[];
}

/**
 * The type ID used to identify the LitDedicationsPart type.
 */
export const LIT_DEDICATIONS_PART_TYPEID = 'it.vedph.itinera.lit-dedications';

/**
 * JSON schema for the LitDedications part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const LIT_DEDICATIONS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/lt/' +
    LIT_DEDICATIONS_PART_TYPEID +
    '.json',
  type: 'object',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'dedications',
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
    dedications: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['title'],
            properties: {
              title: {
                type: 'string',
              },
              date: {
                type: 'object',
                required: ['a'],
                properties: {
                  a: {
                    type: 'object',
                    required: ['value'],
                    properties: {
                      value: {
                        type: 'integer',
                      },
                      isCentury: {
                        type: 'boolean',
                      },
                      isSpan: {
                        type: 'boolean',
                      },
                      isApproximate: {
                        type: 'boolean',
                      },
                      isDubious: {
                        type: 'boolean',
                      },
                      day: {
                        type: 'integer',
                      },
                      month: {
                        type: 'integer',
                      },
                      hint: {
                        type: ['string', 'null'],
                      },
                    },
                  },
                  b: {
                    type: 'object',
                    required: ['value'],
                    properties: {
                      value: {
                        type: 'integer',
                      },
                      isCentury: {
                        type: 'boolean',
                      },
                      isSpan: {
                        type: 'boolean',
                      },
                      isApproximate: {
                        type: 'boolean',
                      },
                      isDubious: {
                        type: 'boolean',
                      },
                      day: {
                        type: 'integer',
                      },
                      month: {
                        type: 'integer',
                      },
                      hint: {
                        type: ['string', 'null'],
                      },
                    },
                  },
                },
              },
              dateSent: {
                type: 'object',
                required: ['a'],
                properties: {
                  a: {
                    type: 'object',
                    required: ['value'],
                    properties: {
                      value: {
                        type: 'integer',
                      },
                      isCentury: {
                        type: 'boolean',
                      },
                      isSpan: {
                        type: 'boolean',
                      },
                      isApproximate: {
                        type: 'boolean',
                      },
                      isDubious: {
                        type: 'boolean',
                      },
                      day: {
                        type: 'integer',
                      },
                      month: {
                        type: 'integer',
                      },
                      hint: {
                        type: ['string', 'null'],
                      },
                    },
                  },
                  b: {
                    type: 'object',
                    required: ['value'],
                    properties: {
                      value: {
                        type: 'integer',
                      },
                      isCentury: {
                        type: 'boolean',
                      },
                      isSpan: {
                        type: 'boolean',
                      },
                      isApproximate: {
                        type: 'boolean',
                      },
                      isDubious: {
                        type: 'boolean',
                      },
                      day: {
                        type: 'integer',
                      },
                      month: {
                        type: 'integer',
                      },
                      hint: {
                        type: ['string', 'null'],
                      },
                    },
                  },
                },
              },
              isByAuthor: {
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
