import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "var(--surface-base)",
          soft: "var(--surface-soft)",
          muted: "var(--surface-muted)",
          dark: "var(--surface-dark)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)"
        },
        brand: {
          lime: "var(--brand-lime)",
          "lime-hover": "var(--brand-lime-hover)",
          blue: "var(--brand-blue)",
          warm: "var(--brand-warm)"
        },
        border: {
          default: "var(--border-default)",
          strong: "var(--border-strong)",
          subtle: "var(--border-subtle)"
        }
      },
      borderRadius: {
        DEFAULT: "var(--radius-md)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)"
      },
      transitionTimingFunction: {
        "out-quart": "var(--ease-out-quart)",
        "out-expo": "var(--ease-out-expo)"
      },
      transitionDuration: {
        fast: "200ms",
        DEFAULT: "400ms",
        slow: "700ms",
        reveal: "900ms"
      },
      animation: {
        "fade-up": "fade-up 0.7s var(--ease-out-quart) forwards"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
