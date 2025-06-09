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
    schemas: {
      ReviewInput: {
        type: 'object',
        required: ['userId', 'menuItemId', 'rating', 'comment'],
        properties: {
          userId: {
            type: 'string',
            example: 'cmbp1r8oc001fhpe8zgklq3kb',
          },
          menuItemId: {
            type: 'string',
            example: 'cmbp1r8jt0000hpe8bvln97ht',
          },
          rating: {
            type: 'integer',
            minimum: 1,
            maximum: 5,
            example: 5,
          },
          comment: {
            type: 'string',
            example: 'Mâncarea a fost excelentă și livrarea rapidă!',
          },
        },
      },

      Review: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'clxyu82ij0002m3ld1wj3abc',
          },
          userId: {
            type: 'string',
            example: 'clxyu81vw0000m3ld1wj3xyz',
          },
          menuItemId: {
            type: 'string',
            example: 'clxyu82ab0001m3ld1wj3pqr',
          },
          rating: {
            type: 'integer',
            example: 5,
          },
          comment: {
            type: 'string',
            example: 'Mâncarea a fost excelentă și livrarea rapidă!',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-06-09T15:34:22Z',
          },
        },
      },

      Reservation: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'clxtw7p5x0002pff4t7a1234',
          },
          name: { type: 'string', example: 'Ion Popescu' },
          email: { type: 'string', example: 'ion.popescu@example.com' },
          phone: { type: 'string', example: '+40712345678' },
          date: { type: 'string', format: 'date', example: '2025-06-10' },
          time: { type: 'string', example: '19:30' },
          guests: { type: 'integer', example: 4 },
        },
      },
      ReservationInput: {
        type: 'object',
        required: ['name', 'email', 'phone', 'date', 'time', 'guests'],
        properties: {
          name: {
            type: 'string',
            example: 'Ion Popescu',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'ion.popescu@example.com',
          },
          phone: {
            type: 'string',
            example: '+40712345678',
          },
          date: {
            type: 'string',
            format: 'date',
            example: '2025-06-10',
          },
          time: {
            type: 'string',
            pattern: '^\\d{2}:\\d{2}$',
            example: '19:30',
          },
          guests: {
            type: 'integer',
            example: 4,
            minimum: 1,
          },
        },
      },

      MenuItem: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'clx123abc' },
          name: { type: 'string', example: 'Pizza Margherita' },
          description: { type: 'string', example: 'Cu mozzarella și busuioc' },
          price: { type: 'number', example: 32.5 },
          category: {
            type: 'string',
            enum: ['STARTER', 'MAIN', 'DESSERT'],
          },
          imageUrl: {
            type: 'string',
            example: 'https://source.unsplash.com/random',
          },
        },
      },
      MenuItemInput: {
        type: 'object',
        required: ['name', 'price', 'category'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          category: {
            type: 'string',
            enum: ['STARTER', 'MAIN', 'DESSERT'],
          },
          imageUrl: { type: 'string' },
        },
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

    '/api/v1/menu-items': {
      get: {
        summary: 'List all menu items',
        tags: ['Menu'],
        responses: {
          200: {
            description: 'Array of menu items',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/MenuItem' },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/reservations': {
      post: {
        summary: 'Create a reservation',
        tags: ['Reservation'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ReservationInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Reservation created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Reservation',
                },
              },
            },
          },
          400: {
            description: 'Invalid input',
          },
          500: {
            description: 'Internal server error',
          },
        },
        security: [], // public route
      },
    },

    // --- POST /reviews ---
    '/api/v1/reviews': {
      post: {
        summary: 'Create a review',
        tags: ['Review'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ReviewInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Review created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Review',
                },
              },
            },
          },
          400: {
            description: 'Invalid input',
          },
        },
        security: [], // public (dacă nu protejezi cu JWT)
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
    '/api/v1/auth/request-password-reset': {
      post: {
        summary: 'Send reset password email',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', example: 'admin@site.com' },
                },
                required: ['email'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Reset link sent (if email is valid)',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        security: [], // public
      },
    },
    '/api/v1/auth/reset-password': {
      post: {
        summary: 'Reset password using token',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['token', 'newPassword'],
                properties: {
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  },
                  newPassword: {
                    type: 'string',
                    example: 'ParolaNoua123!',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Password reset successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          400: { description: 'Invalid or expired token' },
        },
        security: [], // public
      },
    },
  },
};
