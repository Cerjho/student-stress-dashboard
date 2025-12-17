/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#2563eb',
        'blue-dark': '#1e40af',
        'orange-third': '#fb923c',
        'yellow-fourth': '#fbbf24',
        'purple-stress': '#8b5cf6',
        'green-personal': '#22c55e',
        'red-high': '#ef4444',
      },
    },
  },
  plugins: [],
};
