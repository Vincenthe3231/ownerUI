import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // Listen on all network interfaces
        // host: '127.0.0.1',
        port: 5173, // Default Vite port (or your preferred port)
        hmr: {
            host: '192.168.0.24', // Your local IP for Hot Module Replacement
            // host: 'localhost',
            port: 5173,
            protocol: 'http',
            path: '/',
            secure: false,
            timeout: 30000,
            headers: {
                'Cache-Control': 'no-cache',
            },
        },
        strictPort: false,
    },
});
