// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // ✅ App Router
    './pages/**/*.{js,ts,jsx,tsx}',    // якщо раптом є Pages
    './components/**/*.{js,ts,jsx,tsx}' // для всіх компонентів
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
