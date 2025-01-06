/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base Colors
        light: '#FFFAEC', // Light yellow
        beige: '#F5ECD5', // Soft beige
        forest: '#578E7E', // Muted forest
        dark: '#3D3D3D', // Dark gray
        coral: '#FF6F61', // Vibrant coral (accent)

        // Tints (Lighter Versions)
        'light-tint': '#FFFDF5', // Light yellow tint
        'beige-tint': '#FBF4E2', // Beige tint
        'forest-tint': '#7FA599', // forest tint
        'dark-tint': '#555555', // Gray tint
        'coral-tint': '#FFA091', // Coral tint

        // Shades (Darker Versions)
        'light-shade': '#F2E8D4', // Light yellow shade
        'beige-shade': '#E0D2B9', // Beige shade
        'forest-shade': '#3C6E61', // forest shade
        'dark-shade': '#1A1A1A', // Gray shade
        'coral-shade': '#CC544D', // Coral shade
      },
    },
  },
  plugins: [],
}
