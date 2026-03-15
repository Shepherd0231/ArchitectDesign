import { R2UrlInput } from '../components/R2UrlInput';

export const caseStudy = {
  name: 'case',
  title: 'Case',
  type: 'document',
  fields: [
    { name: 'title', type: 'localizedString', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title.en', maxLength: 96 } },
    { name: 'description', type: 'localizedText', title: 'Description' },
    { name: 'publishDate', type: 'datetime', title: 'Publish Date' },
    { name: 'isFeatured', type: 'boolean', title: 'Featured', initialValue: false },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true }, hidden: true },
    {
      name: 'coverImageUrl',
      type: 'string',
      title: 'Cover Image URL',
      components: { input: R2UrlInput },
    },
    { name: 'coverImageMeta', type: 'imageMeta', title: 'Cover Image Metadata' },
    { name: 'client', type: 'string', title: 'Client' },
    { name: 'location', type: 'string', title: 'Location' },
    { name: 'year', type: 'number', title: 'Year' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'externalImage' }] },
    { name: 'seo', type: 'seo', title: 'SEO Metadata' },
  ],
};
