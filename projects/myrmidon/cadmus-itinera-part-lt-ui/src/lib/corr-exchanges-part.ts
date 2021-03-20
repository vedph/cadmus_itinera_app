import { Part } from '@myrmidon/cadmus-core';
import { CorrExchange } from '@myrmidon/cadmus-itinera-core';

/**
 * The correspondent's exchanges part model.
 */
export interface CorrExchangesPart extends Part {
  exchanges: CorrExchange[];
}

/**
 * The type ID used to identify the CorrExchangesPart type.
 */
export const CORR_EXCHANGES_PART_TYPEID = 'it.vedph.itinera.corr-exchanges';

/**
 * JSON schema for the CorrExchanges part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const CORR_EXCHANGES_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/lt/' +
    CORR_EXCHANGES_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'CorrExchangesPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'exchanges',
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
    exchanges: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['from', 'to'],
            properties: {
              isDubious: {
                type: 'boolean',
              },
              isIndirect: {
                type: 'boolean',
              },
              isFromParticipant: {
                type: 'boolean',
              },
              chronotopes: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      required: ['date'],
                      properties: {
                        tag: {
                          type: 'string',
                        },
                        place: {
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
                        textDate: {
                          type: 'string',
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
              participants: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['id'],
                      properties: {
                        id: {
                          type: 'string',
                        },
                        rank: {
                          type: 'integer',
                        },
                        tag: {
                          type: 'string',
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
              attachments: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['type', 'name'],
                      properties: {
                        type: {
                          type: 'string',
                        },
                        name: {
                          type: 'string',
                        },
                        id: {
                          type: 'string',
                        },
                        externalIds: {
                          type: 'array',
                          items: {
                            anyOf: [
                              {
                                type: 'string',
                              },
                            ],
                          },
                        },
                        portion: {
                          type: 'string',
                        },
                        isLost: {
                          type: 'boolean',
                        },
                        isUnknown: {
                          type: 'boolean',
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
