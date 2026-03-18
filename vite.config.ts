import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('@remix-run')) {
              return 'react-vendor';
            }

            return 'vendor';
          }

          if (id.includes('/src/data/') || id.includes('/src/content/')) {
            return 'archive-data';
          }
        },
      },
    },
  },
});
