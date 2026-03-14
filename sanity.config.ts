import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schema';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  '';

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.PUBLIC_SANITY_DATASET ||
  'production';

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID (or PUBLIC_SANITY_PROJECT_ID)');
}
if (projectId === 'dummy123') {
  throw new Error('Invalid SANITY_STUDIO_PROJECT_ID: dummy123');
}

export default defineConfig({
  name: 'default',
  title: 'AstroMeta Studio',
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
