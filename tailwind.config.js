/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(214.3 31.8% 91.4%)',
        input: 'hsl(214.3 31.8% 91.4%)',
        ring: 'hsl(262.1 83.3% 57.8%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222.2 84% 4.9%)',
        primary: {
          DEFAULT: 'hsl(262.1 83.3% 57.8%)',
          foreground: 'hsl(210 40% 98%)',
        },
        accent: {
          DEFAULT: 'hsl(198.1 83.3% 57.8%)',
          foreground: 'hsl(210 40% 98%)',
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(222.2 84% 4.9%)',
        },
        muted: {
          DEFAULT: 'hsl(210 40% 96.1%)',
          foreground: 'hsl(215.4 16.3% 46.9%)',
        },
        dark: {
          border: 'hsl(217 33% 17%)',
          input: 'hsl(217 33% 17%)',
          ring: 'hsl(263.4 70% 50.4%)',
          background: 'hsl(222 84% 5%)',
          foreground: 'hsl(210 40% 98%)',
          primary: {
            DEFAULT: 'hsl(263.4 70% 50.4%)',
            foreground: 'hsl(210 40% 98%)',
          },
          accent: {
            DEFAULT: 'hsl(199.4 70% 50.4%)',
            foreground: 'hsl(210 40% 98%)',
          },
          card: {
            DEFAULT: 'hsl(222 84% 6.5%)',
            foreground: 'hsl(210 40% 98%)',
          },
          muted: {
            DEFAULT: 'hsl(217 33% 17%)',
            foreground: 'hsl(215 20% 65%)',
          },
        }
      },
      keyframes: {
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'scale-in': 'scale-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}