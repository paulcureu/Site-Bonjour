import { OpenAPIV3 } from 'openapi-types';

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',

  info: {
    title: 'Bonjour API',
    version: '1.0.0',
  },

  /* ──────────────────────────────────────────────────────────
     GLOBAL SECURITY: every route will accept an Authorization
     header (you can remove it per route if not needed).
  ────────────────────────────────────────────────────────── */
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],

  paths: {
    /* ---------- AUTH ---------- */
    '/api/v1/auth/login': {
      post: {
        summary: 'User login',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Returns access and refresh token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    accessToken: { type: 'string' },
                    refreshToken: { type: 'string' },
                  },
                },
              },
            },
          },
          401: { description: 'Invalid credentials' },
        },
        /* login itself is PUBLIC, so override global security */
        security: [],
      },
    },

    '/api/v1/auth/refresh': {
      post: {
        summary: 'Refresh access token',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  refreshToken: { type: 'string' },
                },
                required: ['refreshToken'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Returns new access token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    accessToken: { type: 'string' },
                  },
                },
              },
            },
          },
          403: { description: 'Invalid refresh token' },
        },
        security: [], // also public
      },
    },

    /* ---------- ADMIN-ONLY ---------- */
    '/api/v1/admin': {
      get: {
        summary: 'Admin dashboard',
        tags: ['Admin'],
        /*  <-- no `security: []` here, so it inherits global
               bearerAuth and requires a valid JWT              */
        responses: {
          200: { description: 'Welcome, admin!' },
          401: { description: 'Missing or invalid token' },
          403: { description: 'Forbidden – not an admin' },
        },
      },
    },
  },
};
