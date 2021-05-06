import { Part } from '@myrmidon/cadmus-core';
import {
  GeoAddress,
  MsHistoryPerson,
  MsAnnotation,
  MsRestoration,
} from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's history part model.
 */
export interface MsHistoryPart extends Part {
  provenances: GeoAddress[];
  history: string;
  persons?: MsHistoryPerson[];
  annotations?: MsAnnotation[];
  restorations?: MsRestoration[];
}

/**
 * The type ID used to identify the MsHistoryPart type.
 */
export const MSHISTORY_PART_TYPEID = 'it.vedph.itinera.ms-history';

/**
 * JSON schema for the MsHistory part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSHISTORY_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' + MSHISTORY_PART_TYPEID + '.json',
  type: 'object',
  title: 'MsHistoryPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'provenances',
    'history',
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
    provenances: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['area'],
            properties: {
              area: {
                type: 'string',
              },
              address: {
                type: 'string',
              },
            },
          },
        ],
      },
    },
    history: {
      type: 'string',
    },
    persons: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['name'],
            properties: {
              id: {
                type: 'string',
              },
              role: {
                type: 'string',
              },
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
              note: {
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
    annotations: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['language', 'type', 'text'],
            properties: {
              language: {
                type: 'string',
              },
              type: {
                type: 'string',
              },
              text: {
                type: 'string',
              },
              ranges: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['start', 'end'],
                      properties: {
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
                      },
                    },
                  ],
                },
              },
              personId: {
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
    restorations: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['type'],
            properties: {
              type: {
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
              note: {
                type: 'string',
              },
              personId: {
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
  },
};
