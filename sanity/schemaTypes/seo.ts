export const seo = {
  name: 'seo',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    { name: 'metaTitle', type: 'localizedString', title: 'Meta Title' },
    { name: 'metaDescription', type: 'localizedText', title: 'Meta Description' },
    { name: 'canonical', type: 'url', title: 'Canonical' },
    { name: 'ogImage', type: 'image', title: 'OG Image', options: { hotspot: true } },
  ],
};

