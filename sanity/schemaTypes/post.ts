export const post = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'localizedString', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title.en', maxLength: 96 } },
    { name: 'description', type: 'localizedText', title: 'Description' },
    { name: 'publishDate', type: 'datetime', title: 'Publish Date' },
    { name: 'author', type: 'string', title: 'Author' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true } },
    { name: 'coverImageUrl', type: 'url', title: 'Cover Image URL' },
    { name: 'coverImageMeta', type: 'imageMeta', title: 'Cover Image Metadata' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'seo', type: 'seo', title: 'SEO Metadata' },
  ],
};

