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
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "var(--radius-md)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)"
      },
      fontSize: {
        display: ["var(--text-display-size)", { lineHeight: "var(--text-display-lh)" }],
        h1: ["var(--text-h1-size)", { lineHeight: "var(--text-h1-lh)" }],
        h2: ["var(--text-h2-size)", { lineHeight: "var(--text-h2-lh)" }],
        h3: ["var(--text-h3-size)", { lineHeight: "var(--text-h3-lh)" }],
        h4: ["var(--text-h4-size)", { lineHeight: "var(--text-h4-lh)" }],
        "display-sm": ["var(--text-display-size-sm)", { lineHeight: "var(--text-display-lh)" }],
        "h1-sm": ["var(--text-h1-size-sm)", { lineHeight: "var(--text-h1-lh)" }],
        "h2-sm": ["var(--text-h2-size-sm)", { lineHeight: "var(--text-h2-lh)" }],
        "h3-sm": ["var(--text-h3-size-sm)", { lineHeight: "var(--text-h3-lh)" }],
        body: ["var(--text-body-size)", { lineHeight: "var(--text-body-lh)" }],
        "body-sm": ["var(--text-body-sm-size)", { lineHeight: "var(--text-body-sm-lh)" }],
        caption: ["var(--text-caption-size)", { lineHeight: "var(--text-caption-lh)" }],
        eyebrow: ["var(--text-eyebrow-size)", { lineHeight: "var(--text-eyebrow-lh)" }]
      },
      boxShadow: {
        "card-rest": "var(--shadow-card-rest)",
        "card-hover": "var(--shadow-card-hover)",
        "card-feature": "var(--shadow-card-feature)",
        "nav-card": "var(--shadow-nav-card)",
        "btn-primary": "var(--shadow-btn-primary-rest)",
        "btn-primary-hover": "var(--shadow-btn-primary-hover)",
        "btn-secondary": "var(--shadow-btn-secondary-rest)",
        "btn-secondary-hover": "var(--shadow-btn-secondary-hover)",
        "chip-blue": "var(--shadow-chip-blue)",
        "chip-lime": "var(--shadow-chip-lime)",
        "glass-card": "var(--shadow-glass-card)"
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
