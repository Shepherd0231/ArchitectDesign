import { createClient } from '@sanity/client';
import { getSanityEnv, isSanityConfigured } from './env';

export function getSanityClient(options?: { preview?: boolean }) {
  const { preview = false } = options ?? {};
  const { projectId, dataset, apiVersion, token, useCdn } = getSanityEnv();

  if (!isSanityConfigured() || !projectId) {
    throw new Error('Sanity 未配置：缺少 PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET');
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: preview ? false : useCdn,
    token: preview ? token : undefined,
  });
}

