const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lalezar: ['Lalezar', 'sans-serif'],  
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        // Main background color
        'main-bg': '#fcfaee',  // soft beige

        // Vintage Text Colors
        'text-primary': '#3e2723', // dark brown
        'text-secondary': '#5d4037', // medium brown
        'text-accent': '#ffab40', // warm orange

        // Background Colors
        'bg-primary': '#fff8e1', // cream
        'bg-secondary': '#fbe9e7', // light pink

        // Border Colors
        'border-primary': '#bcaaa4', // light brown
        'border-accent': '#ffab40', // warm orange

        // Button Colors
        'btn-primary': '#8d6e63', // brown
        'btn-secondary': '#ffab40', // warm orange
        'btn-accent': '#d32f2f', // deep red

        // Additional colors for a vintage touch
        'gold': '#FFD700',
        'ivory': '#FFFFF0',
        'maroon': '#800000',
      },
    },
  },
  darkMode: "class",  // Enable dark mode
  plugins: [nextui()],
};
