import type { SupportedLocale } from './routing';

const messages = {
  'zh-cn': {
    nav: {
      home: '首页',
      products: '设计案例',
      about: '关于我们',
      blog: '设计视界',
      contact: '联系项目',
      catalog: '产品目录',
    },
    a11y: {
      openMenu: '打开菜单',
      closeMenu: '关闭菜单',
      skipToContent: '跳到主要内容',
    },
    footer: {
      description: '我们致力于通过极简主义设计语言，探索空间与人的深层关系。让建筑回归生活本真，创造超越时代的永恒价值。',
      quickLinks: '快速链接',
      contact: '联系我们',
      address: '上海市静安区延安中路 123 号\n艺术设计中心 4 楼',
      filing: '备案号：沪ICP备12345678号',
    },
    blog: {
      readMore: '阅读全文',
    },
    products: {
      explore: '探索方案',
    },
    floating: {
      title: '项目咨询',
    },
    language: {
      label: '语言',
    },
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Projects',
      about: 'About',
      blog: 'Insights',
      contact: 'Contact',
      catalog: 'Catalog',
    },
    a11y: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      skipToContent: 'Skip to main content',
    },
    footer: {
      description: 'We create timeless spaces through restrained design language, balancing light, material, and emotion.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      address: 'Jing’an District, Shanghai\nNo.123 Yan’an Middle Road\nFloor 4, Art & Design Center',
      filing: 'ICP Filing: Hu ICP 12345678',
    },
    blog: {
      readMore: 'Read more',
    },
    products: {
      explore: 'Explore',
    },
    floating: {
      title: 'Get in touch',
    },
    language: {
      label: 'Language',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      products: 'Proyectos',
      about: 'Nosotros',
      blog: 'Artículos',
      contact: 'Contacto',
      catalog: 'Catálogo',
    },
    a11y: {
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      skipToContent: 'Saltar al contenido principal',
    },
    footer: {
      description: 'Creamos espacios atemporales con un lenguaje de diseño sobrio, equilibrando luz, material y emoción.',
      quickLinks: 'Enlaces',
      contact: 'Contacto',
      address: 'Distrito Jing’an, Shanghái\nN.º 123, Av. Yan’an Middle\nPiso 4, Centro de Arte y Diseño',
      filing: 'Registro ICP: Hu ICP 12345678',
    },
    blog: {
      readMore: 'Leer más',
    },
    products: {
      explore: 'Explorar',
    },
    floating: {
      title: 'Contáctanos',
    },
    language: {
      label: 'Idioma',
    },
  },
} as const;

type Namespace = keyof (typeof messages)['zh-cn'];

export function t(locale: SupportedLocale, ns: Namespace, key: string) {
  const lang = messages[locale] ?? messages['zh-cn'];
  const section = (lang as any)[ns] ?? (messages['zh-cn'] as any)[ns];
  return section?.[key] ?? '';
}

export function getLocaleLabel(locale: SupportedLocale) {
  if (locale === 'zh-cn') return '中文';
  if (locale === 'en') return 'EN';
  if (locale === 'es') return 'ES';
  return locale.toUpperCase();
}
