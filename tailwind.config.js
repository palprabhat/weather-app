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
      sans: ["Barlow", "sans-serif"],
    },
    extend: {
      colors: {
        black: "#2f2e41",
      },
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },
    },
  },
  plugins: [],
};
