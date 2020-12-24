import { Part, PhysicalDimension } from '@myrmidon/cadmus-core';
import { DecoratedCount, MsLocation } from '@myrmidon/cadmus-itinera-core';

/**
 * Manuscript's layout.
 */
export interface MsLayout {
  sample: MsLocation;
  columnCount: number;
  rulingTechnique?: string;
  dimensions?: PhysicalDimension[];
  counts?: DecoratedCount[];
}

/**
 * The manuscript's layouts part model.
 */
export interface MsLayoutsPart extends Part {
  layouts: MsLayout[];
}

/**
 * The type ID used to identify the MsLayoutsPart type.
 */
export const MSLAYOUTS_PART_TYPEID = 'it.vedph.itinera.ms-layouts';

/**
 * JSON schema for the MsLayouts part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSLAYOUTS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' + MSLAYOUTS_PART_TYPEID + '.json',
  type: 'object',
  title: 'MsLayoutsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'layouts',
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
    layouts: {
      $id: '#/properties/layouts',
      type: 'array',
      title: 'The layouts schema',
      description: 'An explanation about the purpose of this instance.',
      default: [],
      examples: [
        [
          {
            sample: {},
            columnCount: 1,
            rulingTechnique: '',
            dimensions: [{}],
            counts: [{}],
          },
        ],
      ],
      additionalItems: true,
      items: {
        $id: '#/properties/layouts/items',
        anyOf: [
          {
            $id: '#/properties/layouts/items/anyOf/0',
            type: 'object',
            title: 'The first anyOf schema',
            description: 'An explanation about the purpose of this instance.',
            default: {},
            examples: [
              {
                sample: {},
                columnCount: 1,
                rulingTechnique: '',
                dimensions: [{}],
                counts: [{}],
              },
            ],
            required: ['sample', 'columnCount'],
            properties: {
              columnCount: {
                type: 'integer',
              },
              rulingTechnique: {
                type: 'string',
              },
              sample: {
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
              dimensions: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['value', 'unit'],
                      properties: {
                        tag: {
                          type: 'string',
                        },
                        value: {
                          type: 'integer',
                        },
                        unit: {
                          type: 'string',
                        },
                      },
                    },
                  ],
                },
              },
              counts: {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'object',
                      required: ['id', 'value'],
                      properties: {
                        id: {
                          type: 'string',
                        },
                        value: {
                          type: 'integer',
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
