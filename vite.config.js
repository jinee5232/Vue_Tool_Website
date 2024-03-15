import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Vue_Tool_Website/",
  plugins: [
    createSvgIconsPlugin({
      // 指定需要缓存的svg图标文件目录
      iconDirs: [path.resolve(process.cwd(), "public/SVG")], // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
    vue(),
  ],
});
