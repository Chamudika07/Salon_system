module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlack: '#111111', // 50% usage
        primaryWhite: '#FFFFFF', // 30% usage
        primaryGreen: '#014421', // 20% usage (dark green)
      },
    },
  },
  plugins: [],
};
