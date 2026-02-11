import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from "vite-plugin-singlefile"
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
    root: 'src/frontend',
    plugins: [
        vue(),
        viteSingleFile(),
        AutoImport({
            imports: ['vue'],
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
                autoprefixer(),
            ],
        },
    },
    resolve: {
        alias: [
            {
                find: './styles/fonts.css',
                replacement: process.env.VITE_USE_CDN_FONTS === 'true'
                    ? path.resolve(__dirname, 'src/styles/empty.css')
                    : path.resolve(__dirname, 'src/styles/fonts.css')
            },
            {
                find: '@',
                replacement: path.resolve(__dirname, './src')
            }
        ]
    },
    build: {
        outDir: '../../dist',
        emptyOutDir: true,
        target: 'esnext',
        assetsInlineLimit: 100000000, // 100MB Limit to inline everything
        chunkSizeWarningLimit: 100000000,
        cssCodeSplit: false,
        brotliSize: false,
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                manualChunks: undefined,
            },
        },
    }
})
