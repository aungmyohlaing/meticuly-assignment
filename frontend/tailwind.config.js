/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
    colors: {
      primary: '#00B4E0',    // Bright Blue
      secondary: '#97D700',  // Lime Green
      white: '#ffffff',
      gray: {
        100: '#f3f4f6',
        300: '#d1d5db',
        700: '#374151',
      },
      blue: {
        600: '#00B4E0',     // Same as primary
        700: '#0099C3',     // Darker shade of primary
      },
      green: {
        500: '#97D700',     // Same as secondary
        600: '#7AB300',     // Darker shade of secondary
      },
      red: {
        500: '#ef4444',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
