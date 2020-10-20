import { Part } from '@myrmidon/cadmus-core';
import { AlnumRange } from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's poem ranges part model.
 */
export interface MsPoemRangesPart extends Part {
  tag?: string;
  ranges: AlnumRange[];
  note?: string;
}

/**
 * The type ID used to identify the MsPoemRangesPart type.
 */
export const MSPOEM_RANGES_PART_TYPEID = 'it.vedph.itinera.ms-poem-ranges';

/**
 * JSON schema for the MsPoemRanges part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSPOEM_RANGES_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/ms/' +
    MSPOEM_RANGES_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'MsPoemRangesPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'ranges'
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
    tag: {
      type: 'string',
    },
    ranges: {
      type: 'array',
      additionalItems: true,
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['a'],
            properties: {
              a: {
                type: 'string',
              },
              b: {
                type: 'string',
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
