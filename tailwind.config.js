/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        SansMono400:['Sans-Mono-400','sans-serif'],
        SansMono500:['Sans-Mono-500','sans-serif'],
        SansMono700:['Sans-Mono-700','sans-serif'],
        SansText400:['Sans-Text-400','sans-serif'],
        SansText700:['Sans-Text-700','sans-serif'],
      },
    },
  },
  plugins: [],
}