import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
   access: {
    read: () => true, // ✅ public read so images load on frontend
    create: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: [
      // ✅ Images
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/avif',
      // ✅ Documents (optional but useful for a blog)
      'application/pdf',
    ],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 250,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 480,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1200,
        height: 630,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    formatOptions: {
      format: 'webp',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
    },
  ],
}