import type { CollectionConfig } from 'payload'


export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      domain: process.env.COOKIE_DOMAIN || undefined,
    },
  },
  access: {
  read: () => true,
  create: ({ req }) => req.user?.role === 'admin',
  update: ({ req }) => {
    if (!req.user) return false
    if (req.user.role === 'admin') return true
    return {
      id: { equals: req.user.id }
    }
  },
  delete: ({ req }) => req.user?.role === 'admin',
},
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true, 
      unique: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
  name: 'title',
  type: 'text',
  required: false,
  admin: {
    description: 'e.g. Founder, CEO, COO, Lead Developer',
  },
},
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'author', 'reader'],
      saveToJWT: true,
      defaultValue: 'reader',
      required: true,
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
    },
  ],
}