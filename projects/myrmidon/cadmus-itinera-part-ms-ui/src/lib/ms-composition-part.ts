import { Part } from '@myrmidon/cadmus-core';
import { MsGuardSheet, MsSection } from '@myrmidon/cadmus-itinera-core';

/**
 * The MsComposition part model.
 */
export interface MsCompositionPart extends Part {
  sheetCount: number;
  guardSheetCount?: number;
  guardSheets?: MsGuardSheet[];
  sections?: MsSection[];
}

/**
 * The type ID used to identify the MsCompositionPart type.
 */
export const MSCOMPOSITION_PART_TYPEID = 'it.vedph.itinera.ms-composition';

/**
 * JSON schema for the MsComposition part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSCOMPOSITION_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' +
    MSCOMPOSITION_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'MsCompositionPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'sheetCount',
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
    sheeCount: {
      type: 'integer',
    },
    guardSheetCount: {
      type: 'integer',
    },
    guardSheets: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['isBack', 'material', 'location'],
            properties: {
              isBack: {
                type: 'boolean',
              },
              material: {
                type: 'string',
              },
              location: {
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
            },
          },
        ],
      },
    },
    sections: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['label', 'start', 'end', 'date'],
            properties: {
              tag: {
                type: 'string',
              },
              label: {
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
            },
          },
        ],
      },
    },
  },
};
