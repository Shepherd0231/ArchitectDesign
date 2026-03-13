export type FallbackCase = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  coverImage: string;
  isFeatured?: boolean;
  client?: string;
  location?: string;
  year?: number;
  tags?: string[];
  bodyHtml: string;
};

export type FallbackPost = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  author?: string;
  tags?: string[];
  coverImage: string;
  bodyHtml: string;
};

export const fallbackCases: FallbackCase[] = [
  {
    slug: 'minimalist-villa-design',
    title: '极简主义别墅设计',
    description: '通过光影与空间的精准平衡，打造静谧的现代人居艺术空间。',
    publishDate: '2024-05-10',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    client: '私人业主',
    location: '上海，中国',
    year: 2024,
    tags: ['住宅设计', '极简主义'],
    bodyHtml:
      '<h3>设计理念</h3><p>项目坐落于城市边缘的一片静谧之地。我们以“内向的宇宙”为核心概念，通过一系列内向型庭院和精心设计的开口，将自然光与景观引入室内，同时保证了居住者的绝对隐私。建筑主体采用清水混凝土与暖色木材，营造出一种冷静而又温暖的氛围。</p><h3>空间叙事</h3><p>入口处通过一条狭长的廊道，引导访客从喧嚣的外部世界进入一个宁静的内在空间。客厅拥有整面的落地玻璃，面向一个精心布置的枯山水庭院，模糊了室内外的界限。卧室则被设计为更加私密和内向的“盒子”，确保了绝对的安宁。</p>',
  },
  {
    slug: 'urban-commercial-space',
    title: '城市商业空间规划',
    description: '融合功能性与美学感，为现代商业注入独特的品牌灵魂与流动感。',
    publishDate: '2024-03-15',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    client: 'XYZ 地产集团',
    location: '北京，中国',
    year: 2023,
    tags: ['商业建筑', '城市更新'],
    bodyHtml:
      '<h3>项目挑战</h3><p>该项目旨在将一个老旧的工业厂区改造为一个集办公、零售和文化活动于一体的现代商业综合体。设计的核心挑战在于如何在尊重原有工业遗存的同时，注入新的商业活力和公共性。</p><h3>设计策略</h3><p>我们保留了最具代表性的几座厂房结构，并将其作为新建筑群的“骨架”。通过植入新的玻璃“盒子”和开放式连廊，新旧元素形成了有趣的对话。中庭被改造为一个下沉式的公共广场，成为整个项目的社交核心。</p>',
  },
  {
    slug: 'sustainable-renovation',
    title: '可持续性旧建筑改造',
    description: '尊重历史纹理，通过现代材料与生态技术赋予老建筑第二次生命。',
    publishDate: '2023-11-20',
    coverImage: 'https://images.unsplash.com/photo-1518005020250-68a30635299c?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    client: '历史保护基金会',
    location: '苏州，中国',
    year: 2023,
    tags: ['建筑改造', '可持续设计'],
    bodyHtml:
      '<h3>保护与新生</h3><p>本项目是对一座拥有百年历史的江南民居进行保护性改造。我们秉持“最小干预”原则，完整保留了原有的木结构和砖墙，仅对破损部分进行修复。新的功能空间，如厨房和卫生间，则以“插件”的形式置入，与老建筑主体明确区分。</p><h3>生态技术</h3><p>屋顶被改造为太阳能瓦片屋顶，满足了建筑的日常用电需求。同时，我们设计了雨水回收系统，用于庭院灌溉。这些现代生态技术的融入，让这座老宅在保留历史风貌的同时，也获得了可持续的未来。</p>',
  },
];

export const fallbackPosts: FallbackPost[] = [
  {
    slug: 'dialogue-of-light-and-shadow',
    title: '光与影的对话：现代美术馆设计',
    description: '探讨在现代建筑设计中，如何利用自然光塑造空间情绪，并引导参观者的动线与体验。',
    publishDate: '2024-06-01',
    author: '设计总监 A',
    tags: ['设计理论', '光影艺术'],
    coverImage: 'https://images.unsplash.com/photo-1581224463294-90831633b432?auto=format&fit=crop&w=1200&q=80',
    bodyHtml:
      '<p>在柯布西耶的眼中，“建筑是对光线进行组织的游戏”。对于美术馆这类空间而言，光不仅仅是满足照明的功能性需求，它本身就是一种强大的展品。本文将结合我们最近完成的“光之容器”美术馆项目，探讨几种利用自然光进行空间叙事的手法。</p><h4>1. 天光的戏剧性</h4><p>我们通过在主展厅顶部设置一系列朝向各异的线性天窗，将一天中不同时间、不同角度的光线引入室内。光线在纯白的墙壁上移动，形成缓慢变化的影子，为静态的艺术品增添了时间的维度。</p><h4>2. 侧光的引导性</h4><p>在连接不同展厅的廊道中，我们放弃了传统的顶部照明，转而采用低矮的、线性的侧边地灯。这种设计不仅创造了一种独特的、具有仪式感的过渡空间，更重要的是，它将参观者的视线引向下一个展厅的入口，起到了微妙的动线引导作用。</p>',
  },
  {
    slug: 'honesty-of-materials',
    title: '材料的诚实性：从混凝土到再生木材',
    description: '在消费主义盛行的当下，我们为何要坚持使用“诚实”的材料？本文将探讨材料的真实表达在建筑中的情感价值。',
    publishDate: '2024-05-20',
    author: '主创建筑师 B',
    tags: ['材料研究', '可持续性'],
    coverImage: 'https://images.unsplash.com/photo-1554037313-c93814c55de3?auto=format&fit=crop&w=1200&q=80',
    bodyHtml:
      '<p>“材料的诚实性”意味着让材料展现其本来的面貌——混凝土的粗犷、木材的温暖、金属的冰冷。我们相信，当材料被真实地表达时，它们能够与人产生更深层次的情感共鸣。</p><p>在我们的项目中，我们倾向于使用未经多余装饰的原材料。例如，我们会保留清水混凝土浇筑过程中留下的模板痕迹，因为这些痕迹记录了建造的过程，是建筑的“年轮”。我们也会使用从旧建筑中回收的木材，它们表面的斑驳与划痕，讲述着时间的故事。</p>',
  },
];

export const fallbackSiteSettings = {
  title: 'AstroMeta Design Studio',
  email: 'studio@astrometa.design',
  phone: '+86 21 6688 9988',
  whatsapp: 'https://wa.me/862166889988',
  wechat: 'AstroMeta_Studio',
  social: {
    instagram: 'https://instagram.com/',
    behance: 'https://www.behance.net/',
    pinterest: 'https://www.pinterest.com/',
    xhs: 'https://www.xiaohongshu.com/',
    facebook: 'https://facebook.com/',
  },
};
