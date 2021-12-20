import { defineConfig } from "vite-plugin-windicss";
import typography from "windicss/plugin/typography";
import colors from "windicss/colors";

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
