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
        NanumMyeongjo:['Nanum Myeongjo','sans-serif'],
      },
      colors: {
        // Greens
        'custom-lime': '#e5ff59',
        'custom-green': '#48f08b',
        'custom-lime-yellow': '#daef68',
        'custom-electric-lime': '#d7ff40',
        'custom-neon-green': '#39ff88',
        'custom-chartreuse': '#dfff00',
        
        // Purples
        'custom-light-violet': '#c7b0ff',
        'custom-violet': '#8f9aff',
        'custom-bright-purple': '#bb94ff',
        
        // Pinks
        'custom-light-pink': '#ffb1ee',
        'custom-hot-pink': '#ff7aeb',
        
        // Blues
        'custom-blue': '#007aff',
        'custom-electric-blue': '#6cacff',
        'custom-vivid-blue': '#008cff',
        
        // Oranges
        'custom-orange': '#ff8e59',
        'custom-brownish-orange': '#eebc41',
        'custom-bright-orange': '#ff7b00',
        'custom-marigold': '#ffba00',
        
        // Yellows
        'custom-yellow': '#fcfd54',
        'custom-bright-yellow': '#fffa33',
        'rich-burgundy': '#9b1a1b',
      },
    },
  },
  plugins: [],
}