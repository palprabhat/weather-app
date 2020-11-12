module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    "./components/**/*.jsx",
    "./components/**/*.js",
    "./pages/**/*.jsx",
    "./pages/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Quattrocento Sans", "sans-serif"],
    },
    extend: {
      spacing: {
        9: "2.25rem",
        11: "2.75rem",
      },
      colors: {
        black: "#2f2e41",
      },
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "group-hover", "group-focus"],
    textColor: ["responsive", "hover", "focus", "group-hover", "group-focus"],
  },
  plugins: [],
};
