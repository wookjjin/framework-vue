import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItPrism from 'markdown-it-prism'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { defineConfig, loadEnv } from 'vite'
import Pages from 'vite-plugin-pages'
// https://vite.dev/config/
// eslint-disable-next-line unused-imports/no-unused-vars
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env)

  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dirs: ['src/composables/**', 'src/store', 'src/utils'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
      }),
      Markdown({
        wrapperClasses: 'prose prose-sm m-auto text-left',
        headEnabled: true,
        markdownItOptions: {
          html: true,
          linkify: true,
          typographer: true,
        },
        markdownItSetup(md) {
          md.use(MarkdownItAnchor)
          md.use(MarkdownItPrism)
        },
      }),
      Pages({
        dirs: [
          { dir: 'src/guide', baseRoute: 'guide' },
        ],
        extensions: ['vue', 'md'],

      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: '@use "~/styles/helpers/_variables.scss" as *;',
        },
      },
    },

    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['workbox-window', /vue-i18n/, /element-plus/],
    },
  }
})
