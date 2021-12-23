import { defineConfig } from "vite-plugin-windicss";
import typography from "windicss/plugin/typography";

/**
 * Creates bullshit css variables that support transparency
 * @author Bluskript
 */
const withOpacityValue =
  (cssVariable: string) =>
  ({ opacityVariable, opacityValue }) => {
    if (opacityValue) return `rgba(var(--${cssVariable}), ${opacityValue})`;
    if (opacityVariable) return `rgba(var(--${cssVariable}), var(${opacityVariable}, 1))`;
    return `rgb(var(--${cssVariable}))`;
  };

export default defineConfig({
  darkMode: "class",
  plugins: [typography()],
  theme: {
    extend: {
      colors: {
        background: withOpacityValue("color-background"),
        caution: withOpacityValue("color-caution"),
      },
    },
  },
});
