import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugin: [react()],
    server: {
        proxy: {
            '/todo': {
                target: 'https://localhost:7091',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})