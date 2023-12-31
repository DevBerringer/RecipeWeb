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
