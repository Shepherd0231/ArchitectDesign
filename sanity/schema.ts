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
import { externalImage } from './schemaTypes/externalImage';

export const schemaTypes = [
  localizedString,
  localizedText,
  seo,
  imageMeta,
  externalImage,
  section,
  page,
  caseStudy,
  post,
  siteSettings,
  contactMessage,
];
