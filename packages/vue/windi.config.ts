import { defineConfig } from "vite-plugin-windicss";
import typography from "windicss/plugin/typography";

/**
 * Creates bullshit css variables that support transparency
 * @author Bluskript
 */
const withOpacityValue = (cssVariable: string) => ({ opacityVariable, opacityValue }) => {
	if (opacityValue) {
		if (opacityVariable) return `rgba(var(--color-${cssVariable}), var(${opacityVariable}, 1))`;
		return `rgba(var(--color-${cssVariable}), ${opacityValue})`;
	}
	return `rgb(var(--color-${cssVariable}))`;
};

export default defineConfig({
	darkMode: "class",
	plugins: [typography()],
	theme: {
		extend: {
			colors: {
				"text": withOpacityValue("text"),
				"caution": withOpacityValue("caution"),
				"active": withOpacityValue("active"),
				"docker": withOpacityValue("docker"),
				"firewall": withOpacityValue("firewall"),
				"100mbps": withOpacityValue("100mbps"),
				"1000mbps": withOpacityValue("1000mbps"),
				"10000mbps": withOpacityValue("10000mbps"),
				"100000mbps": withOpacityValue("100000mbps"),
				"background": {
					200: withOpacityValue("background-200"),
					300: withOpacityValue("background-300"),
					400: withOpacityValue("background-400"),
					500: withOpacityValue("background-500"),
					600: withOpacityValue("background-600"),
				},
				"tooltip": {
					background: withOpacityValue("tooltip-background"),
					text: withOpacityValue("tooltip-text"),
				},
				"primary": {
					300: withOpacityValue("primary-300"),
					400: withOpacityValue("primary-400"),
					500: withOpacityValue("primary-500"),
				},
			},
		},
	},
});
