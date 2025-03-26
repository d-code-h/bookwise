import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-red-100',
    'bg-orange-100',
    'bg-amber-100',
    'bg-yellow-100',
    'bg-lime-100',
    'bg-green-100',
    'bg-emerald-100',
    'bg-teal-100',
    'bg-cyan-100',
    'bg-sky-100',
    'bg-blue-100',
    'bg-indigo-100',
    'bg-violet-100',
    'bg-purple-100',
    'bg-fuchsia-100',
    'bg-pink-100',
    'bg-rose-100',
  ],
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex-sans': ['IBM Plex Sans', 'sans-serif'],
        'bebas-neue': ['var(--bebas-neue)'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        primary: {
          DEFAULT: '#E7C9A5',
          admin: '#25388C',
        },
        green: {
          DEFAULT: '#027A48',
          100: '#ECFDF3',
          400: '#4C7B62',
          500: '#2CC171',
          800: '#027A48',
        },
        red: {
          DEFAULT: '#EF3A4B',
          400: '#F46F70',
          500: '#E27233',
          800: '#EF3A4B',
          overdue: '#FF6C6F',
        },
        blue: {
          100: '#0089F1',
        },
        light: {
          100: '#D6E0FF',
          200: '#EED1AC',
          300: '#F8F8FF',
          400: '#EDF1F1',
          500: '#8D8D8D',
          600: '#F9FAFB',
          700: '#E2E8F0',
          800: '#F8FAFC',
        },
        dark: {
          100: '#16191E',
          200: '#3A354E',
          300: '#232839',
          400: '#1E293B',
          500: '#0F172A',
          600: '#333C5C',
          700: '#464F6F',
          800: '#1E2230',
        },
        gray: {
          100: '#CBD5E1',
        },

        // role: {
        //   user: '#C11574',
        //   admin: '',
        // },
      },

      screens: {
        xs: '480px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        pattern: "url('/images/pattern.webp')",
        'gradient-custom': 'linear-gradient(180deg, #232839 0%, #12141D 100%)',
        'card-gradient': 'linear-gradient(180deg, #12141D 0%, #12151F 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')],
} satisfies Config;
