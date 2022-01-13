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
				id: "xornet.cloud",
				name: "Xornet Cloud",
				short_name: "Xornet",
				start_url: "https://beta.xornet.cloud/#/dashboard/machines",
				scope: "https://beta.xornet.cloud/",
				display: "standalone",
				description: "Xornet Dashboard",
				theme_color: "#010409",
				icons: [
					{
						src: "icons/icon-48x48.png",
						sizes: "48x48",
						type: "image/png",
					},
					{
						src: "icons/icon-72x72.png",
						sizes: "72x72",
						type: "image/png",
					},
					{
						src: "icons/icon-96x96.png",
						sizes: "96x96",
						type: "image/png",
					},
					{
						src: "icons/icon-128x128.png",
						sizes: "128x128",
						type: "image/png",
					},
					{
						src: "icons/icon-144x144.png",
						sizes: "144x144",
						type: "image/png",
					},
					{
						src: "icons/icon-152x152.png",
						sizes: "152x152",
						type: "image/png",
					},
					{
						src: "icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "icons/icon-284x284.png",
						sizes: "284x284",
						type: "image/png",
					},
					{
						src: "icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
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
