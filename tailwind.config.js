/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      xs: '400px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    require('daisyui'),
    
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#6a00ff', // Accent purple
          secondary: '#ff6bcb', // Accent pink
          accent: '#007bff', // Accent blue
          background: '#0d0d0d', // Dark background
          buttonPrimary: '#4a00ff', // Button purple
          buttonSecondary: '#1a1a1a', // Button dark
        }
      }
    ]
  }
}