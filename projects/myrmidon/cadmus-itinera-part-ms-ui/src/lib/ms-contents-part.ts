import { Part } from '@myrmidon/cadmus-core';
import { MsContent } from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's contents part model.
 */
export interface MsContentsPart extends Part {
  contents: MsContent[];
}

/**
 * The type ID used to identify the MsContentsPart type.
 */
export const MSCONTENTS_PART_TYPEID = 'it.vedph.itinera.ms-contents';

/**
 * JSON schema for the MsContents part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSCONTENTS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' + MSCONTENTS_PART_TYPEID + '.json',
  type: 'object',
  title: 'MsContentsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'contents',
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
    contents: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['work'],
            properties: {
              author: {
                type: 'string',
              },
              claimedAuthor: {
                type: 'string',
              },
              work: {
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
              state: {
                type: 'string',
              },
              incipit: {
                type: 'string'
              },
              explicit: {
                type: 'string'
              },
              note: {
                type: 'string',
              },
              units: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['label'],
                      properties: {
                        label: {
                          type: 'string',
                        },
                        incipit: {
                          type: 'string',
                        },
                        explicit: {
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
