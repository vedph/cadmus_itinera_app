import { Part } from '@myrmidon/cadmus-core';
import { MsDecoration } from '@myrmidon/cadmus-itinera-core';

/**
 * The MsDecorations part model.
 */
export interface MsDecorationsPart extends Part {
  decorations: MsDecoration[];
}

/**
 * The type ID used to identify the MsDecorationsPart type.
 */
export const MSDECORATIONS_PART_TYPEID = 'it.vedph.itinera.ms-decorations';

/**
 * JSON schema for the MsDecorations part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSDECORATIONS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' +
    MSDECORATIONS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'MsDecorationsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'decorations'
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
    decorations: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['type', 'subject', 'colors', 'layout', 'tool'],
            properties: {
              type: {
                type: 'string',
              },
              subject: {
                type: 'string',
              },
              colors: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'string',
                    },
                  ],
                },
              },
              layout: {
                type: 'string',
              },
              tool: {
                type: 'string',
              },
              start: {
                type: 'object',
                required: ['n'],
                properties: {
                  n: {
                    type: 'integer',
                  },
                  v: {
                    type: 'boolean',
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
                  v: {
                    type: 'boolean',
                  },
                  l: {
                    type: 'integer',
                  },
                },
              },
              position: {
                type: 'string',
              },
              size: {
                type: 'object',
                required: [],
                properties: {
                  tag: {
                    type: 'string',
                  },
                  w: {
                    type: 'object',
                    required: ['value', 'unit'],
                    properties: {
                      tag: {
                        type: 'string',
                      },
                      value: {
                        type: 'number',
                      },
                      unit: {
                        type: 'string',
                      },
                    },
                  },
                  d: {
                    type: 'object',
                    required: ['value', 'unit'],
                    properties: {
                      tag: {
                        type: 'string',
                      },
                      value: {
                        type: 'number',
                      },
                      unit: {
                        type: 'string',
                      },
                    },
                  },
                  h: {
                    type: 'object',
                    required: ['value', 'unit'],
                    properties: {
                      tag: {
                        type: 'string',
                      },
                      value: {
                        type: 'number',
                      },
                      unit: {
                        type: 'string',
                      },
                    },
                  },
                  note: {
                    type: 'string',
                  },
                },
              },
              description: {
                type: 'string',
              },
              textRelation: {
                type: 'string',
              },
              guideLetters: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['position'],
                      properties: {
                        position: {
                          type: 'string',
                        },
                        morphology: {
                          type: 'string',
                        },
                      },
                    },
                  ],
                },
              },
              imageId: {
                type: 'string',
              },
              artist: {
                type: 'object',
                required: ['type', 'id', 'name'],
                properties: {
                  type: {
                    type: 'string',
                  },
                  id: {
                    type: 'string',
                  },
                  name: {
                    type: 'string',
                  },
                  note: {
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
            },
          },
        ],
      },
    },
  },
};
