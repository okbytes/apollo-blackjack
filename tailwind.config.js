module.exports = {
  darkMode: false,
  purge: ["./src/**/*.js"],
  theme: {
    typography: (theme) => ({}),
    extend: {}
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")]
}
