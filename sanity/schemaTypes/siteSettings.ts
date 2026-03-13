export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Site Title' },
    { name: 'email', type: 'string', title: 'Email' },
    { name: 'phone', type: 'string', title: 'Phone' },
    { name: 'whatsapp', type: 'string', title: 'WhatsApp' },
    { name: 'wechat', type: 'string', title: 'WeChat' },
    {
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'xhs', type: 'url', title: 'Xiaohongshu' },
        { name: 'behance', type: 'url', title: 'Behance' },
        { name: 'pinterest', type: 'url', title: 'Pinterest' },
      ],
    },
  ],
};

