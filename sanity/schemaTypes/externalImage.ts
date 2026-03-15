import { R2UrlInput } from '../components/R2UrlInput';

export const externalImage = {
  name: 'externalImage',
  title: 'External Image',
  type: 'object',
  fields: [
    {
      name: 'url',
      title: 'Image URL',
      type: 'string',
      components: { input: R2UrlInput },
    },
    { name: 'meta', title: 'Image Metadata', type: 'imageMeta' },
  ],
};

