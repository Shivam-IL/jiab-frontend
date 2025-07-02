import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    screens: {
      'xxs': {'max': '389px'},
    },
    fontFamily: {
      sans: [
        "var(--font-geist-sans)",
        // Mac fallbacks
        "-apple-system",
        "BlinkMacSystemFont", 
        // Windows fallbacks
        "Segoe UI",
        // Generic fallbacks
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
        // Emoji fallbacks
        "Apple Color Emoji",
        "Segoe UI Emoji", 
        "Segoe UI Symbol",
        "Noto Color Emoji"
      ],
      mono: [
        "var(--font-geist-mono)",
        // Mac fallbacks
        "SF Mono",
        "Monaco",
        // Windows fallbacks
        "Consolas",
        // Generic fallbacks
        "Liberation Mono",
        "Menlo",
        "Courier New",
        "monospace"
      ],
      aktiv: [
        "var(--font-aktiv-grotesk)",
        // Mac fallbacks
        "-apple-system",
        "BlinkMacSystemFont",
        // Windows fallbacks
        "Segoe UI",
        // Generic fallbacks
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
        // Emoji fallbacks
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol", 
        "Noto Color Emoji"
      ],
    },
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))'
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))'
      },
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))'
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))'
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))'
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))'
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))'
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      chart: {
        '1': 'hsl(var(--chart-1))',
        '2': 'hsl(var(--chart-2))',
        '3': 'hsl(var(--chart-3))',
        '4': 'hsl(var(--chart-4))',
        '5': 'hsl(var(--chart-5))'
      },
      green: '#11A64B',
      lightGray: '#F3F3F3',
      red: '#FF0000',
      mediumGray: '#606060',
      yellow: '#FFE200',
      black: '#000000',
      white: '#FFFFFF',
      offWhite: '#F2F2F2',
      descriptionText: '#808080'
    },
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)'
    }
  }
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.font-smooth': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        '.font-crisp': {
          '-webkit-font-smoothing': 'auto',
          '-moz-osx-font-smoothing': 'auto',
        }
      }
      addUtilities(newUtilities);
    })
  ],
};
export default config;
