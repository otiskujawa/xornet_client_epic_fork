import { defineConfig } from "vite-plugin-windicss";
import typography from "windicss/plugin/typography";

/**
 * Creates bullshit css variables that support transparency
 * @author Bluskript
 */
const withOpacityValue = (cssVariable: string) => ({ opacityVariable, opacityValue }) => {
	if (opacityValue) {
		if (opacityVariable) return `rgba(var(--${cssVariable}), var(${opacityVariable}, 1))`;
		return `rgba(var(--${cssVariable}), ${opacityValue})`;
	}
	return `rgb(var(--${cssVariable}))`;
};

export default defineConfig({
	darkMode: "class",
	plugins: [typography()],
	theme: {
		extend: {
			colors: {
				text: withOpacityValue("color-text"),
				caution: withOpacityValue("color-caution"),
				background: withOpacityValue("color-background"),
				tooltip: {
					background: withOpacityValue("color-tooltip-background"),
					text: withOpacityValue("color-tooltip-text"),
				},
				primary: {
					300: withOpacityValue("color-primary-300"),
					400: withOpacityValue("color-primary-400"),
					500: withOpacityValue("color-primary-500"),
				},
			},
		},
	},
});
