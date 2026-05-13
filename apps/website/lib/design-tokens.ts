export const COLORS = {
  surface: {
    base: "#ffffff",
    soft: "#f8f8f7",
    muted: "#f5f5f5",
    dark: "#181818"
  },
  text: {
    primary: "#181818",
    secondary: "#5f5f5f",
    muted: "#8e8e8e",
    inverse: "#ffffff"
  },
  brand: {
    lime: "#BBF451",
    limeHover: "#A6DB46",
    blue: "#007AFF",
    warm: "#FFF89A"
  }
} as const;

export const EASE = {
  outQuart: "power4.out",
  outExpo: "expo.out",
  inOut: "power2.inOut"
} as const;

export const DURATION = {
  fast: 0.2,
  default: 0.4,
  slow: 0.7,
  reveal: 0.9
} as const;
