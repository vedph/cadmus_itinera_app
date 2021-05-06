import { DocReference, Part } from '@myrmidon/cadmus-core';
import { Chronotope } from '@myrmidon/cadmus-itinera-core';

/**
 * A person's work.
 */
export interface PersonWork {
  language: string;
  isDubious?: boolean;
  isLost?: boolean;
  genre?: string;
  titles: string[];
  chronotopes?: Chronotope[];
  references?: DocReference[];
  note?: string;
}

/**
 * The person's works part model.
 */
export interface PersonWorksPart extends Part {
  works: PersonWork[];
}

/**
 * The type ID used to identify the PersonWorksPart type.
 */
export const PERSON_WORKS_PART_TYPEID = 'it.vedph.itinera.person-works';

/**
 * JSON schema for the PersonWorks part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const PERSON_WORKS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/lt/' +
    PERSON_WORKS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'PersonWorksPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'works',
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
    works: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['language', 'titles'],
            properties: {
              language: {
                type: 'string',
              },
              isDubious: {
                type: 'boolean',
              },
              isLost: {
                type: 'boolean',
              },
              genre: {
                type: 'string',
              },
              titles: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'string',
                    },
                  ],
                },
              },
              chronotopes: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: [],
                      properties: {
                        tag: {
                          type: 'string',
                        },
                        place: {
                          type: 'string',
                        },
                        isPlaceDubious: {
                          type: 'boolean',
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
              references: {
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
              note: {
                type: 'string'
              }
            },
          },
        ],
      },
    },
  },
};
