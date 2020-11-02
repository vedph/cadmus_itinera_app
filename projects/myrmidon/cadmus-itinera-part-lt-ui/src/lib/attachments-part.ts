import { Part } from '@myrmidon/cadmus-core';
import { EpistAttachment } from '@myrmidon/cadmus-itinera-core';

/**
 * The Attachments part model.
 */
export interface AttachmentsPart extends Part {
  attachments: EpistAttachment[];
}

/**
 * The type ID used to identify the AttachmentsPart type.
 */
export const ATTACHMENTS_PART_TYPEID = 'it.vedph.itinera.attachments';

/**
 * JSON schema for the Attachments part. This is used in the editor demo.
 * You can use the JSON schema tool at https://jsonschema.net/.
 */
export const ATTACHMENTS_PART_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id:
    'www.vedph.it/cadmus/parts/itinera/lt/' + ATTACHMENTS_PART_TYPEID + '.json',
  type: 'object',
  title: 'AttachmentsPart',
  required: [
    'id',
    'itemId',
    'typeId',
    'timeCreated',
    'creatorId',
    'timeModified',
    'userId',
    'attachments',
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
    attachments: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            required: ['type', 'name'],
            properties: {
              type: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              portion: {
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
