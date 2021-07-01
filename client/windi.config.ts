const colors = require("windicss/colors");

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
        display: ['Oswald'],
        body: ['Open Sans'],
        workSans: ['Work Sans'],
      },
    },
    colors: {
      ...colors,
      xorblack: "var(--black)",
      xorwhite: "var(--white)",
      rainbow: {
        green: 'rgb(118, 230, 80)',
        yellow: 'rgb(249, 214, 73)',
        orange: 'rgb(240, 142, 53)',
        red: 'rgb(236, 81, 87)',
        pink: 'rgb(255, 24, 189)',
        blue: 'rgb(26, 75, 255)',
        cyan: 'rgb(98, 216, 249)',
      },
      primary: {
        100: "#271485",
        200: "#4221EE",
        300: "#6142FF",
        400: "#8872FE"
      },
      secondary: {
        100: "#132AA7",
        200: "#2548FF",
        300: "#516DFF",
        400: "#758BFF"
      },
      tertiary: {
        100: "#00418E",
        200: "#0093E5",
        300: "#32B5FF",
        400: "#5ECFFF"
      },
      black: "#000000",
      white: "#FFFFFF",
      gray: {
        100: "#070a10",
        200: "#0d1117",
        300: "#161b22",
        400: "#21262d",
        500: "#2b3138",
        600: "#434A52",
        700: "#63696F",
        800: "#94969A",
        900: "#CACACA",
      },
      alpha: {
        100: "rgba(255, 255, 255, 1.00)",
        90: "rgba(255, 255, 255, 0.88)",
        80: "rgba(255, 255, 255, 0.78)",
        70: "rgba(255, 255, 255, 0.58)",
        60: "rgba(255, 255, 255, 0.40)",
        50: "rgba(255, 255, 255, 0.30)",
        40: "rgba(255, 255, 255, 0.20)",
        30: "rgba(255, 255, 255, 0.15)",
        20: "rgba(255, 255, 255, 0.12)",
        10: "rgba(255, 255, 255, 0.08)",
        0o5: "rgba(255, 255, 255, 0.04)",
        0o0: "rgba(255, 255, 255, 0.02)"
      }
      // borderStateDisabled: module.exports.alpha[70],
      // borderAccent: module.exports.primary[200],
    }
  }
};
