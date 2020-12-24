import { Part } from '@myrmidon/cadmus-core';
import { DecoratedId } from '@myrmidon/cadmus-itinera-core';

/**
 * The letter info part model.
 */
export interface LetterInfoPart extends Part {
  letterId: string;
  language: string;
  subject: string;
  authorId: string;
  headings?: string[];
  recipients?: DecoratedId[];
  replyingTo?: DecoratedId[];
  note?: string;
}

/**
 * The type ID used to identify the LetterInfoPart type.
 */
export const LETTER_INFO_PART_TYPEID = 'it.vedph.itinera.letter-info';

/**
 * JSON schema for the LetterInfo part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const LETTER_INFO_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/lt/' + LETTER_INFO_PART_TYPEID + '.json',
  type: 'object',
  title: 'LetterInfoPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'letterId',
    'language',
    'subject',
    'authorId',
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
    letterId: {
      type: 'string',
    },
    language: {
      type: 'string',
    },
    subject: {
      type: 'string',
    },
    authorId: {
      type: 'string',
    },
    headings: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'string',
          },
        ],
      },
    },
    recipients: {
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
    replyingTo: {
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
    note: {
      type: 'string',
    },
  },
};
