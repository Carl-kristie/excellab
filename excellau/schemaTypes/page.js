// /schemas/page.ts
import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),

    // Hero
    defineField({name: 'heroTitle', type: 'string'}),
    defineField({name: 'heroSubtitle', type: 'text'}),
    defineField({name: 'heroCtaText', type: 'string'}),
    defineField({name: 'heroCtaUrl', type: 'url'}),

    // About section
    defineField({name: 'aboutTitle', type: 'string'}),
    defineField({name: 'aboutHeading', type: 'string'}),
    defineField({name: 'aboutBody', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'aboutImage', type: 'image', options: {hotspot: true}}),

    // Home services selection
    defineField({
      name: 'services',
      title: 'Services shown on Home',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
    }),

    // SEO
    defineField({name: 'seoDescription', type: 'text'}),
  ],
})
