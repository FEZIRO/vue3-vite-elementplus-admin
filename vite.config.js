import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import strip from "@rollup/plugin-strip";
import viteCompression from "vite-plugin-compression";
const path = require("path");

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [
    vue(),
    //正式环境打包查看各文件大小占比
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    //正式环境打包去除调试语句
    {
      ...strip({
        include: ["**/*.js", "**/*.vue", "**/*.ts", "**/*.jsx"],
      }),
      apply: "build",
    },
    //打包开启gzip压缩
    viteCompression(),
  ],
  resolve: {
    alias: {
      // 键必须以斜线开始和结束
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        //添加scss全局变量样式
        additionalData: "@import './src/styles/global.scss';",
      },
    },
  },
  server: {
    // 配置调试服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
    host: "0.0.0.0",
    port: 3000, // 服务器端口号
    open: true, // 是否自动打开浏览器
  },
};
