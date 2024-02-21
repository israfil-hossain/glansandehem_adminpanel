import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'], // Allow both .js and .jsx files
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Add other dependencies as needed
  },
});
