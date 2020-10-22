import { Part } from '@myrmidon/cadmus-core';
import {
  DecoratedCount,
  MsLocation,
  PhysicalDimension,
} from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's dimensions part model.
 */
export interface MsDimensionsPart extends Part {
  sample: MsLocation;
  dimensions?: PhysicalDimension[];
  counts?: DecoratedCount[];
}

/**
 * The type ID used to identify the MsDimensionsPart type.
 */
export const MSDIMENSIONS_PART_TYPEID = 'it.vedph.itinera.ms-dimensions';

/**
 * JSON schema for the MsDimensions part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSDIMENSIONS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' +
    MSDIMENSIONS_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'MsDimensionsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'sample',
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
    sample: {
      type: 'object',
      required: ['n', 'r'],
      properties: {
        n: {
          type: 'integer',
        },
        r: {
          type: 'string',
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
};
