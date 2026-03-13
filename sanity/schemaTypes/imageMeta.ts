export const imageMeta = {
  name: 'imageMeta',
  title: 'Image Metadata',
  type: 'object',
  fields: [
    {
      name: 'sourceType',
      type: 'string',
      title: 'Source Type',
      options: {
        list: [
          { title: 'Sanity Asset', value: 'sanity' },
          { title: 'Cloudflare R2', value: 'r2' },
          { title: 'Unsplash', value: 'unsplash' },
          { title: 'AI Generated', value: 'ai' },
          { title: 'Stock', value: 'stock' },
          { title: 'Photo', value: 'photo' },
          { title: 'External', value: 'external' },
        ],
      },
    },
    { name: 'alt', type: 'string', title: 'Alt Text' },
    { name: 'caption', type: 'string', title: 'Caption' },
    { name: 'credit', type: 'string', title: 'Credit' },
    { name: 'sourceName', type: 'string', title: 'Source Name' },
    { name: 'sourceUrl', type: 'url', title: 'Source URL' },
    { name: 'license', type: 'string', title: 'License' },
    { name: 'r2Key', type: 'string', title: 'R2 Key' },
    { name: 'unsplashId', type: 'string', title: 'Unsplash ID' },
    { name: 'aiTool', type: 'string', title: 'AI Tool' },
    { name: 'aiPrompt', type: 'text', title: 'AI Prompt' },
  ],
};

