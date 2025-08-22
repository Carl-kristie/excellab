// Site-wide settings for header, footer, and global content
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    
    // Header Settings
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Company Logo',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'companyName',
          title: 'Company Name',
          type: 'string',
          initialValue: 'Excella U Energy',
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
        }),
        defineField({
          name: 'navigation',
          title: 'Navigation Menu',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Menu Title',
                type: 'string',
              }),
              defineField({
                name: 'url',
                title: 'URL',
                type: 'string',
              }),
              defineField({
                name: 'isActive',
                title: 'Is Active',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          }],
        }),
      ],
    }),
    
    // Footer Settings
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'contactInfo',
          title: 'Contact Information',
          type: 'object',
          fields: [
            defineField({
              name: 'emails',
              title: 'Email Addresses',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'phones',
              title: 'Phone Numbers',
              type: 'array',
              of: [{type: 'string'}],
            }),
            defineField({
              name: 'address',
              title: 'Physical Address',
              type: 'text',
            }),
          ],
        }),
        defineField({
          name: 'navigationLinks',
          title: 'Footer Navigation',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'title',
                title: 'Link Title',
                type: 'string',
              }),
              defineField({
                name: 'url',
                title: 'URL',
                type: 'string',
              }),
            ],
          }],
        }),
        defineField({
          name: 'socialMedia',
          title: 'Social Media Links',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'platform',
                title: 'Platform',
                type: 'string',
                options: {
                  list: [
                    {title: 'Facebook', value: 'facebook'},
                    {title: 'Twitter', value: 'twitter'},
                    {title: 'LinkedIn', value: 'linkedin'},
                    {title: 'YouTube', value: 'youtube'},
                    {title: 'Instagram', value: 'instagram'},
                  ],
                },
              }),
              defineField({
                name: 'url',
                title: 'URL',
                type: 'url',
              }),
            ],
          }],
        }),
        defineField({
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          initialValue: 'Copyright ©2025 All rights reserved',
        }),
      ],
    }),
    
    // SEO Settings
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'defaultTitle',
          title: 'Default Page Title',
          type: 'string',
        }),
        defineField({
          name: 'defaultDescription',
          title: 'Default Meta Description',
          type: 'text',
        }),
        defineField({
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
        }),
      ],
    }),
  ],
})
