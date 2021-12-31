/* eslint-env node */

import { builtinModules } from "module";
import { join } from "path";
import vue from "@vitejs/plugin-vue";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";
import { VitePWA } from "vite-plugin-pwa";
import { chrome } from "../../.electron-vendors.cache.json";

const PACKAGE_ROOT = __dirname;

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
	mode: process.env.MODE,
	root: PACKAGE_ROOT,
	resolve: {
		alias: {
			"/@/": `${join(PACKAGE_ROOT, "src")}/`,
		},
	},
	plugins: [
		Components({
			resolvers: [
				IconsResolver({
					customCollections: ["fluency", "distros"],
				}),
			],
		}),
		WindiCSS(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
			manifest: {
				name: "Xornet Cloud",
				short_name: "Xornet",
				start_url: "./dashboard/machines",
				display: "standalone",
				description: "Xornet Dashboard",
				theme_color: "#010409",
			},
		}),
		Icons({
			customCollections: {
				fluency: FileSystemIconLoader("./resources/svg"),
				distros: FileSystemIconLoader("./resources/distros"),
			},
		}),
		vue(),
	],
	base: "",
	server: {
		fs: {
			strict: true,
		},
	},
	build: {
		sourcemap: true,
		target: `chrome${chrome}`,
		outDir: "dist",
		assetsDir: ".",
		rollupOptions: {
			external: [...builtinModules],
		},
		emptyOutDir: true,
		brotliSize: false,
	},
});
