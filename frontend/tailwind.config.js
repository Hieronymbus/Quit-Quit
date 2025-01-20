/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector' ,
  theme: {
    extend: {
      height: {
        'full-minus-16': 'calc(100% - 4rem)', // 4rem = 16 Tailwind spacing unit
      },
    }
  },
  plugins: [],
}

