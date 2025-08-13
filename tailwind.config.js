// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // ✅ App Router
    './pages/**/*.{js,ts,jsx,tsx}',    // якщо раптом є Pages
    './components/**/*.{js,ts,jsx,tsx}' // для всіх компонентів
  ],
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f6ff",
          100: "#e9f0ff",
          400: "#6b86c4",
          500: "#5572b2",
          600: "#3e5fa3",
        },
      },
      boxShadow: {
        soft: "0 2px 10px rgba(20, 35, 80, .08), inset 0 1px 0 rgba(255,255,255,.6)",
        btn: "0 4px 12px rgba(20, 35, 80, .15)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
