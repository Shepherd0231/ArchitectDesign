import { caseStudy } from './schemaTypes/case';
import { localizedString } from './schemaTypes/localizedString';
import { localizedText } from './schemaTypes/localizedText';
import { page } from './schemaTypes/page';
import { post } from './schemaTypes/post';
import { section } from './schemaTypes/section';
import { seo } from './schemaTypes/seo';
import { imageMeta } from './schemaTypes/imageMeta';
import { siteSettings } from './schemaTypes/siteSettings';
import { contactMessage } from './schemaTypes/contactMessage';

export const schemaTypes = [
  localizedString,
  localizedText,
  seo,
  imageMeta,
  section,
  page,
  caseStudy,
  post,
  siteSettings,
  contactMessage,
];
