import { DocReference, Part } from '@myrmidon/cadmus-core';

/**
 * The PersonHand part model.
 */
export interface PersonHandPart extends Part {
  personId: string;
  job: string;
  others?: DocReference[];
}

/**
 * The type ID used to identify the PersonHandPart type.
 */
export const PERSON_HAND_PART_TYPEID = 'it.vedph.itinera.person-hand';

/**
 * JSON schema for the PersonHand part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const PERSON_HAND_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/lt/' + PERSON_HAND_PART_TYPEID + '.json',
  type: 'object',
  title: 'PersonHandPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'personId',
    'type',
    'job',
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
    personId: {
      type: 'string',
    },
    job: {
      type: 'string',
    },
    others: {
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
};
