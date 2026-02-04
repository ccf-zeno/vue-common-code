import path from 'path';
import { VantResolver } from '@vant/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

/**
 * TODO css的按需引入
 */
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outDir: 'es',
      staticImport: true,
      insertTypesEntry: false,
      copyDtsFiles: true,
      beforeWriteFile: (filePath, content) => {
        const rootOutDir = path.resolve(__dirname, 'es/types');
        const absoluteFilePath = path.resolve(filePath);

        if (absoluteFilePath === path.join(rootOutDir, 'index.d.ts')) {
          return {
            filePath,
            content: `/// <reference path="./global.d.ts" />\n/// <reference path="./component.d.ts" />\n${content}`,
          };
        }

        return { filePath, content };
      },
    }),
    AutoImport({
      resolvers: [
        VantResolver({
          importStyle: false,
        }),
        ArcoResolver({
          importStyle: false,
        }),
      ],
      dirs: ['src/components'],
    }),
    Components({
      resolvers: [
        VantResolver({
          importStyle: false,
        }),
        ArcoResolver({
          sideEffect: true,
          importStyle: false,
        }),
      ],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'index',
    },
    rollupOptions: {
      external: (id) => {
        // 所有 node_modules 里的包都 external
        return !id.startsWith('.') && !id.startsWith('/') && !id.includes('\0');
      },
      output: {
        format: 'es',
        dir: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    cssCodeSplit: false,
    emptyOutDir: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
});
