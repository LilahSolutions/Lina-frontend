/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './common/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './hocs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Configure your custom color variables for tailwind here.
        main: 'var(--main-color)',
        background: 'var(--background-color)',
      },
      boxShadow: {
        customShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.25)',
        Elevation1: '0px 1px 3px 0px rgba(0, 0, 0, 0.30)',
        Elevation2: '0px 2px 5px 0px rgba(0, 0, 0, 0.20);',
        Elevation3: '0px 2px 8px 0px rgba(0, 0, 0, 0.25)',
        Elevation4: '0px 0px 15px 0px rgba(0, 0, 0, 0.30)',
        Elevation3blue: '0px 2px 8px 0px rgba(0, 0, 255, 0.25)',
      },
    },
  },
  plugins: [],
};
