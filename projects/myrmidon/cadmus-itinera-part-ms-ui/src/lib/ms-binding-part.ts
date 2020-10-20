import { Part } from '@myrmidon/cadmus-core';
import { PhysicalSize } from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's binding part model.
 */
export interface MsBindingPart extends Part {
  century: number;
  description: string;
  coverMaterial: string;
  supportMaterial: string;
  size?: PhysicalSize;
}

/**
 * The type ID used to identify the MsBindingPart type.
 */
export const MSBINDING_PART_TYPEID = 'it.vedph.itinera.ms-binding';

/**
 * JSON schema for the MsBinding part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSBINDING_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' + MSBINDING_PART_TYPEID + '.json',
  type: 'object',
  title: 'MsBindingPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'century',
    'description',
    'coverMaterial',
    'supportMaterial',
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
    century: {
      type: 'integer',
    },
    description: {
      type: 'string',
    },
    coverMaterial: {
      type: 'string',
    },
    supportMaterial: {
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
  },
};
