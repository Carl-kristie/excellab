// /schemas/service.ts
import {defineField, defineType} from 'sanity'
export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: r => r.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: r => r.required()}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'linkText', type: 'string', initialValue: 'Read More'}),
    defineField({name: 'linkUrl', type: 'url'}),
  ],
})
