/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    fontFamily: {
      body: ["var(--font-body)"],
      heading: ["var(--font-heading)"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xs": "360px",
        "xs": "480px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        link: "hsl(var(--link))",
        background: {
          DEFAULT: "hsl(var(--background))",
          subtle: "hsl(var(--subtle))",
          elevated: "hsl(var(--elevated))",
          strong: "hsl(var(--strong))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          subtle: "hsl(var(--foreground-subtle))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          soft: "hsl(var(--primary-soft))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          muted: "hsl(var(--destructive-muted))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          muted: "hsl(var(--success-muted))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          muted: "hsl(var(--warning-muted))",
          bright: "hsl(var(--warning-bright))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      minHeight: {
        "screen": "calc(var(--vh) * 100)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        card: "calc(var(--radius) + 4px)",
        input: "calc(var(--radius) - 2px)",
        button: "calc(var(--radius) - 2px)"
      },
      boxShadow: {
        strong: "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px -1px rgba(0, 0, 0, 0.10)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}