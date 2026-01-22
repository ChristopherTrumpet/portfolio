import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  env: {
    schema: {
      // Use 'public' if client-side
      // Use 'server' if frontmatter/SSR
      API_URL: envField.string({
        context: 'server', 
        access: 'public', 
        default: 'https://api.cmkt.dev'
      }),
    }
  },
  integrations: [react(), icon()],
  adapter: vercel(),
});