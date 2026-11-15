/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        udaan: {
          navy: '#142D4E',
          'navy-dark': '#0E1F36',
          'navy-light': '#1C3E6B',
          blue: '#2463A6',
          'blue-light': '#3B82C4',
          'blue-soft': '#EBF2F9',
          teal: '#18A999',
          'teal-light': '#24C5B3',
          'teal-soft': '#E6F8F5',
          offwhite: '#F7F8F6',
          softgrey: '#E8EDF1',
          charcoal: '#252D35',
          amber: '#E5A23C',
          'amber-soft': '#FEF7EC',
          red: '#C94C4C',
          'red-soft': '#FBECEC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(20, 45, 78, 0.05), 0 1px 2px -1px rgba(20, 45, 78, 0.05)',
        'card': '0 4px 6px -1px rgba(20, 45, 78, 0.07), 0 2px 4px -2px rgba(20, 45, 78, 0.05)',
        'elevated': '0 10px 15px -3px rgba(20, 45, 78, 0.08), 0 4px 6px -4px rgba(20, 45, 78, 0.04)',
        'modal': '0 20px 25px -5px rgba(20, 45, 78, 0.15), 0 8px 10px -6px rgba(20, 45, 78, 0.1)',
      }
    },
  },
  plugins: [],
}
