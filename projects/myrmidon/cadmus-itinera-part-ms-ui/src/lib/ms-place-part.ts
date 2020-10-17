import { Part } from '@myrmidon/cadmus-core';
import { DocReference, MsLocation } from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's place of origin part model.
 */
export interface MsPlacePart extends Part {
  area: string;
  address?: string;
  city?: string;
  site?: string;
  subscriber?: string;
  subscriptionLoc?: MsLocation;
  sources?: DocReference[];
}

/**
 * The type ID used to identify the MsPlacePart type.
 */
export const MSPLACE_PART_TYPEID = 'it.vedph.itinera.ms-place';

/**
 * JSON schema for the MsPlace part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSPLACE_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.vedph.it/cadmus/parts/itinera/ms/' + MSPLACE_PART_TYPEID + '.json',
  type: 'object',
  title: 'MsPlacePart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    // TODO: add other required properties here...
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
    area: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    site: {
      type: 'string',
    },
    subscriber: {
      type: 'string',
    },
    subscriptionLoc: {
      type: 'object',
      required: ['n', 'v'],
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
    sources: {
      type: 'array',
      additionalItems: true,
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
};
