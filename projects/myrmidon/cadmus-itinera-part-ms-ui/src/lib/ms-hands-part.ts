import { Part } from '@myrmidon/cadmus-core';
import { MsHandInstance } from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's hands instances part model.
 */
export interface MsHandsPart extends Part {
  hands: MsHandInstance[];
}

/**
 * The type ID used to identify the MsHandsPart type.
 */
export const MSHANDS_PART_TYPEID = 'it.vedph.itinera.ms-hands';

/**
 * JSON schema for the MsHands part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSHANDS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.vedph.it/cadmus/parts/itinera/ms/' + MSHANDS_PART_TYPEID + '.json',
  type: 'object',
  title: 'MsHandsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'hands',
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
    hands: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['id', 'idReason'],
            properties: {
              id: {
                type: 'string',
              },
              idReason: {
                type: 'string',
              },
              start: {
                type: 'object',
                required: ['n'],
                properties: {
                  n: {
                    type: 'integer',
                  },
                  r: {
                    type: 'boolean',
                  },
                  s: {
                    type: 'integer',
                  },
                  l: {
                    type: 'integer',
                  },
                },
              },
              end: {
                type: 'object',
                required: ['n'],
                properties: {
                  n: {
                    type: 'integer',
                  },
                  r: {
                    type: 'boolean',
                  },
                  s: {
                    type: 'integer',
                  },
                  l: {
                    type: 'integer',
                  },
                },
              },
              extentNote: {
                type: 'string',
              },
              rubrications: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['location', 'type'],
                      properties: {
                        location: {
                          type: 'object',
                          required: ['n'],
                          properties: {
                            n: {
                              type: 'integer',
                            },
                            r: {
                              type: 'boolean',
                            },
                            s: {
                              type: 'integer',
                            },
                            l: {
                              type: 'integer',
                            },
                          },
                        },
                        type: {
                          type: 'string',
                        },
                        description: {
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
              subscription: {
                type: 'object',
                required: ['location', 'language'],
                properties: {
                  location: {
                    type: 'object',
                    required: ['n'],
                    properties: {
                      n: {
                        type: 'integer',
                      },
                      r: {
                        type: 'boolean',
                      },
                      s: {
                        type: 'integer',
                      },
                      l: {
                        type: 'integer',
                      },
                    },
                  },
                  language: {
                    type: 'string',
                  },
                  text: {
                    type: 'string',
                  },
                },
              },
            },
          },
        ],
      },
    },
  },
};
