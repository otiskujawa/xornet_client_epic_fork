import { defineConfig } from "vite-plugin-windicss";
import typography from "windicss/plugin/typography";
import colors from "windicss/colors";

/**
 * Creates bullshit css variables that support transparency
 * @author Bluskript
 */
function cssVarRgbHelper(cssVariable: string) {
  return ({ opacityVariable, opacityValue }: { opacityVariable: string; opacityValue: number }) => {
    if (opacityValue) return `rgba(var(--${cssVariable}), ${opacityValue})`;
    if (opacityVariable) return `rgba(var(--${cssVariable}), var(${opacityVariable}, 1))`;
    return `rgb(var(--${cssVariable}))`;
  };
}

export default defineConfig({
  darkMode: "class",
  plugins: [typography()],
  theme: {
    extend: {
      ...colors,
      colors: {
        "background-color": "var(--background-color)",
      },
    },
  },
});
