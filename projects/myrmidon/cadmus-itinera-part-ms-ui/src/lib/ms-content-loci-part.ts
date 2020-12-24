import { Part } from '@myrmidon/cadmus-core';
import { MsContentLocus } from '@myrmidon/cadmus-itinera-core';

/**
 * The MsContentLoci part model.
 */
export interface MsContentLociPart extends Part {
  loci: MsContentLocus[];
}

/**
 * The type ID used to identify the MsContentLociPart type.
 */
export const MSCONTENT_LOCI_PART_TYPEID = 'it.vedph.itinera.ms-content-loci';

/**
 * JSON schema for the MsContentLoci part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSCONTENTLOCI_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' +
    MSCONTENT_LOCI_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'MsContentLociPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'loci',
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
    loci: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['citation', 'text'],
            properties: {
              citation: {
                type: 'string',
              },
              text: {
                type: 'string',
              },
              refSheet: {
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
              imageId: {
                type: 'string',
              },
            },
          },
        ],
      },
    },
  },
};
