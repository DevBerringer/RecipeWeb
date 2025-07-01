/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,js,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        recipecentral: {
          light: '#f6e8da',
          DEFAULT: '#C7A9A2',
          dark: '#3E3A39',
        },
        parchment: {
          50: '#FDF5E6', // A very light, warm cream
          100: '#F8E9D5', // Slightly darker for variations
        },
        bronze: {
          300: '#CD7F32', // A muted bronze/brown for number badges
        },
        checkboxCustom: '#FF0000', // Replace with your desired color
      },
      screens: {
        xs: '480px',
        ss: '620px',
        sm: '786px',
        md: '1060px',
        lg: '1200px',
        xl: '1700px',
      },
    },
  },
  plugins: [],
};
