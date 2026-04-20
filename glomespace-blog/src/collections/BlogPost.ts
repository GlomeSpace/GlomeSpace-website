
import {
  lexicalEditor,
  FixedToolbarFeature,
  HorizontalRuleFeature,
  EXPERIMENTAL_TableFeature,
  TextStateFeature,
  defaultColors,
  BlocksFeature,
  LinkFeature
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'


import type { CollectionConfig } from 'payload'



export const BlogPost: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => {
    if (req.user) return true 
    return {
      status: {
        equals: 'published', 
      },
    }
  },        
    create: ({ req }) => !!req.user,  // only logged in users
    update: ({ req }) => {
    if (!req.user) return false
    if (req.user.role === 'admin') return true
    // authors can only edit their own posts
    return {
      author: { equals: req.user.id }
    }
  },
    delete: ({ req }) => req.user?.role === 'admin', // only admins
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title e.g. my-first-post',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
  name: 'content',
  type: 'richText',
  required: true,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
       ...defaultFeatures.filter(
        (f) => f.key !== 'link' 
      ),
      LinkFeature({
        enabledCollections: ['blogs',], 
      }),
      FixedToolbarFeature(),      
      HorizontalRuleFeature(),     
      EXPERIMENTAL_TableFeature(),
      TextStateFeature({
  state: {
    ...defaultColors,
  },
}),
      BlocksFeature({            
        blocks: [CalloutBlock, YoutubeBlock],
      }),
    ],
  }),
},
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
  ],
}

const CalloutBlock: Block = {
  slug: 'callout',
  fields: [
    {
      name: 'type',
      type: 'select',          // ✅ now TypeScript knows this is literally 'select'
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Tip', value: 'tip' },
        { label: 'Danger', value: 'danger' },
      ],
      defaultValue: 'info',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}

const YoutubeBlock: Block = {
  slug: 'youtube',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'Paste the YouTube video URL here',
      },
    },
  ],
}