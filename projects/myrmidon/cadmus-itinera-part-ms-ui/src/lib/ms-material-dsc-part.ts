import { Part } from '@myrmidon/cadmus-core';
import { MsPalimpsest } from '@myrmidon/cadmus-itinera-core';

/**
 * The manuscript's material description part model.
 */
export interface MsMaterialDscPart extends Part {
  material: string;
  format: string;
  state: string;
  stateNote?: string;
  palimpsests?: MsPalimpsest[];
}

/**
 * The type ID used to identify the MsMaterialDscPart type.
 */
export const MSMATERIAL_DSC_PART_TYPEID = 'it.vedph.itinera.ms-material-dsc';

/**
 * JSON schema for the MsMaterialDsc part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const MSMATERIALDSC_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/__PROJECT__/__LIB__' +
    MSMATERIAL_DSC_PART_TYPEID +
    '.json',
  type: 'object',
  title: 'MsMaterialDscPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'material',
    'format',
    'state',
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
    material: {
      type: 'string',
    },
    format: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    stateNote: {
      type: 'string',
    },
    palimpsests: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['location'],
            properties: {
              location: {
                type: 'object',
                required: ['n', 'v'],
                properties: {
                  n: {
                    type: 'integer',
                  },
                  v: {
                    type: 'string',
                  },
                  l: {
                    type: 'integer',
                  },
                },
              },
              date: {
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
                        $id:
                          '#/properties/birthDate/properties/a/properties/value',
                        type: 'integer',
                      },
                      isCentury: {
                        $id:
                          '#/properties/birthDate/properties/a/properties/isCentury',
                        type: 'boolean',
                      },
                      isSpan: {
                        $id:
                          '#/properties/birthDate/properties/a/properties/isSpan',
                        type: 'boolean',
                      },
                      isApproximate: {
                        $id:
                          '#/properties/birthDate/properties/a/properties/isApproximate',
                        type: 'boolean',
                      },
                      isDubious: {
                        $id:
                          '#/properties/birthDate/properties/a/properties/isDubious',
                        type: 'boolean',
                      },
                      day: {
                        $id:
                          '#/properties/birthDate/properties/a/properties/day',
                        type: 'integer',
                      },
                      month: {
                        $id:
                          '#/properties/birthDate/properties/a/properties/month',
                        type: 'integer',
                      },
                      hint: {
                        $id:
                          '#/properties/birthDate/properties/a/properties/hint',
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
                        $id:
                          '#/properties/birthDate/properties/b/properties/value',
                        type: 'integer',
                      },
                      isCentury: {
                        $id:
                          '#/properties/birthDate/properties/b/properties/isCentury',
                        type: 'boolean',
                      },
                      isSpan: {
                        $id:
                          '#/properties/birthDate/properties/b/properties/isSpan',
                        type: 'boolean',
                      },
                      isApproximate: {
                        $id:
                          '#/properties/birthDate/properties/b/properties/isApproximate',
                        type: 'boolean',
                      },
                      isDubious: {
                        $id:
                          '#/properties/birthDate/properties/b/properties/isDubious',
                        type: 'boolean',
                      },
                      day: {
                        $id:
                          '#/properties/birthDate/properties/b/properties/day',
                        type: 'integer',
                      },
                      month: {
                        $id:
                          '#/properties/birthDate/properties/b/properties/month',
                        type: 'integer',
                      },
                      hint: {
                        $id:
                          '#/properties/birthDate/properties/b/properties/hint',
                        type: 'string',
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
  },
};
