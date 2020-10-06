import { HistoricalDate, Part } from '@myrmidon/cadmus-core';
import { PersonName } from '@myrmidon/cadmus-itinera-core';

/**
 * The Person part model.
 */
export interface PersonPart extends Part {
  personId: string;
  externalIds?: string[];
  names: PersonName[];
  sex?: string;
  birthDate?: HistoricalDate;
  birthPlace?: string;
  deathDate?: HistoricalDate;
  deathPlace?: string;
  bio?: string;
}

/**
 * The type ID used to identify the PersonPart type.
 */
export const PERSON_PART_TYPEID = 'it.vedph.itinera.person';

/**
 * JSON schema for the Person part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const PERSON_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'www.vedph.it/cadmus/parts/itinera/lt/' + PERSON_PART_TYPEID + '.json',
  type: 'object',
  title: 'PersonPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'personId',
    'names',
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
      $id: '#/properties/personId',
      type: 'string',
    },
    externalIds: {
      $id: '#/properties/externalIds',
      type: 'array',
    },
    names: {
      $id: '#/properties/names',
      type: 'array',
    },
    sex: {
      $id: '#/properties/sex',
      type: 'string',
    },
    birthDate: {
      $id: '#/properties/birthDate',
      type: 'object',
      required: ['a'],
      properties: {
        a: {
          $id: '#/properties/birthDate/properties/a',
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              $id: '#/properties/birthDate/properties/a/properties/value',
              type: 'integer',
            },
            isCentury: {
              $id: '#/properties/birthDate/properties/a/properties/isCentury',
              type: 'boolean',
            },
            isSpan: {
              $id: '#/properties/birthDate/properties/a/properties/isSpan',
              type: 'boolean',
            },
            isApproximate: {
              $id:
                '#/properties/birthDate/properties/a/properties/isApproximate',
              type: 'boolean',
            },
            isDubious: {
              $id: '#/properties/birthDate/properties/a/properties/isDubious',
              type: 'boolean',
            },
            day: {
              $id: '#/properties/birthDate/properties/a/properties/day',
              type: 'integer',
            },
            month: {
              $id: '#/properties/birthDate/properties/a/properties/month',
              type: 'integer',
            },
            hint: {
              $id: '#/properties/birthDate/properties/a/properties/hint',
              type: 'string',
            },
          },
        },
        b: {
          $id: '#/properties/birthDate/properties/b',
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              $id: '#/properties/birthDate/properties/b/properties/value',
              type: 'integer',
            },
            isCentury: {
              $id: '#/properties/birthDate/properties/b/properties/isCentury',
              type: 'boolean',
            },
            isSpan: {
              $id: '#/properties/birthDate/properties/b/properties/isSpan',
              type: 'boolean',
            },
            isApproximate: {
              $id:
                '#/properties/birthDate/properties/b/properties/isApproximate',
              type: 'boolean',
            },
            isDubious: {
              $id: '#/properties/birthDate/properties/b/properties/isDubious',
              type: 'boolean',
            },
            day: {
              $id: '#/properties/birthDate/properties/b/properties/day',
              type: 'integer',
            },
            month: {
              $id: '#/properties/birthDate/properties/b/properties/month',
              type: 'integer',
            },
            hint: {
              $id: '#/properties/birthDate/properties/b/properties/hint',
              type: 'string',
            },
          },
        },
      },
    },
    birthPlace: {
      $id: '#/properties/birthPlace',
      type: 'string',
    },
    deathDate: {
      $id: '#/properties/deathDate',
      type: 'object',
      required: ['a'],
      properties: {
        a: {
          $id: '#/properties/deathDate/properties/a',
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              $id: '#/properties/deathDate/properties/a/properties/value',
              type: 'integer',
            },
            isCentury: {
              $id: '#/properties/deathDate/properties/a/properties/isCentury',
              type: 'boolean',
            },
            isSpan: {
              $id: '#/properties/deathDate/properties/a/properties/isSpan',
              type: 'boolean',
            },
            isApproximate: {
              $id:
                '#/properties/deathDate/properties/a/properties/isApproximate',
              type: 'boolean',
            },
            isDubious: {
              $id: '#/properties/deathDate/properties/a/properties/isDubious',
              type: 'boolean',
            },
            day: {
              $id: '#/properties/deathDate/properties/a/properties/day',
              type: 'integer',
            },
            month: {
              $id: '#/properties/deathDate/properties/a/properties/month',
              type: 'integer',
            },
            hint: {
              $id: '#/properties/deathDate/properties/a/properties/hint',
              type: 'string',
            },
          },
        },
        b: {
          $id: '#/properties/deathDate/properties/b',
          type: 'object',
          required: ['value'],
          properties: {
            value: {
              $id: '#/properties/deathDate/properties/b/properties/value',
              type: 'integer',
            },
            isCentury: {
              $id: '#/properties/deathDate/properties/b/properties/isCentury',
              type: 'boolean',
            },
            isSpan: {
              $id: '#/properties/deathDate/properties/b/properties/isSpan',
              type: 'boolean',
            },
            isApproximate: {
              $id:
                '#/properties/deathDate/properties/b/properties/isApproximate',
              type: 'boolean',
            },
            isDubious: {
              $id: '#/properties/deathDate/properties/b/properties/isDubious',
              type: 'boolean',
            },
            day: {
              $id: '#/properties/deathDate/properties/b/properties/day',
              type: 'integer',
            },
            month: {
              $id: '#/properties/deathDate/properties/b/properties/month',
              type: 'integer',
            },
            hint: {
              $id: '#/properties/deathDate/properties/b/properties/hint',
              type: 'string',
            },
          },
        },
      },
    },
    deathPlace: {
      $id: '#/properties/deathPlace',
      type: 'string',
    },
    bio: {
      $id: '#/properties/bio',
      type: 'string',
    },
  },
};
