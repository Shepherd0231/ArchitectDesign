import { R2UrlInput } from '../components/R2UrlInput';

export const section = {
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    { name: 'title', type: 'localizedString', title: 'Title' },
    {
      name: 'layout',
      type: 'string',
      options: { list: ['hero', 'cards', 'text-left', 'text-right', 'grid'] },
    },
    { name: 'content', type: 'array', of: [{ type: 'block' }, { type: 'externalImage' }] },
    { name: 'image', type: 'image', title: 'Image', options: { hotspot: true }, hidden: true },
    {
      name: 'imageUrl',
      type: 'string',
      title: 'Image URL',
      components: { input: R2UrlInput },
    },
    { name: 'imageMeta', type: 'imageMeta', title: 'Image Metadata' },
    {
      name: 'data',
      title: 'Data',
      type: 'object',
      fields: [{ name: 'json', title: 'JSON', type: 'text' }],
    },
  ],
};
