import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
    },
  },
  optimizeDeps: {
    include: [
      // Critical Solana dependencies
      "@solana/wallet-adapter-react",
      "@solana/wallet-adapter-react-ui",
      "@solana/wallet-adapter-phantom",
      "@solana/web3.js",
      
      // Heavy UI libraries used throughout the app
      "@mui/material",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
      
      // Trading/Chart libraries (large bundle)
      "lightweight-charts",
      
      // HTTP client (commonly used)
      "axios",
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  server: {
    port: 3001, // Match the Next.js port for consistency
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    target: 'esnext',
  },
});
