
// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['@tanstack/react-table'],
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
   alias: {
      'Components': path.resolve(__dirname, 'src/Components'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  optimizeDeps: {
    include: ["@tanstack/react-table"],
  },
});





