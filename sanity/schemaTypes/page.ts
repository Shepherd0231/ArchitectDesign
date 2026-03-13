export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', type: 'localizedString', title: 'Page Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title.en', maxLength: 96 } },
    { name: 'sections', type: 'array', of: [{ type: 'reference', to: [{ type: 'section' }] }] },
    { name: 'seo', type: 'seo', title: 'SEO Metadata' },
  ],
};

