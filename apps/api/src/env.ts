import envSchema from 'env-schema';

export const env = envSchema({
  schema: {
    type: 'object',
    required: ['PORT', 'LOGTAIL_TOKEN'],
    properties: {
      PORT: {
        type: 'string',
        default: '3000',
      },
      LOGTAIL_TOKEN: {
        type: 'string',
      },
    },
  },
  dotenv: true,
});
