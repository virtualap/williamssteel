/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Deliberately sharp: the shop aesthetic is cut plate, not rounded corners.
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      sm: "2px",
      edge: "2px",
      full: "9999px",
    },
    extend: {
      colors: {
        // Surfaces
        paper: {
          DEFAULT: "#F4F1EA", // warm off-white, the default page ground
          dim: "#E9E4D8",     // alternate / recessed sections
        },
        // Text + hard lines
        ink: {
          DEFAULT: "#16181D", // near-black with a cool cast
          soft: "#33373F",    // secondary text on paper
        },
        // Primary accent — torch / molten steel
        weld: {
          DEFAULT: "#E4512B",
          dark: "#C13F1E",    // hover / pressed
          light: "#F0703F",
        },
        // Dark sections — drafting-ink teal, not a generic gradient grey
        blueprint: {
          DEFAULT: "#17313D",
          dark: "#0F232C",
        },
        // Cool neutral ramp (replaces scattered raw Tailwind greys)
        steel: {
          100: "#E4E1DA",
          200: "#C9C6BE", // borders on light
          300: "#A9A69D",
          400: "#86847C", // placeholder text
          500: "#63625B", // muted body text
          600: "#4A4A44",
          700: "#343430",
        },
        // Semantic — separated from the brand accent on purpose
        success: { DEFAULT: "#3F7D4E", surface: "#E7F0E7", border: "#9DBFA2" },
        warning: { DEFAULT: "#C98A1E", surface: "#F6ECD6", border: "#DCC38A" },
        danger: { DEFAULT: "#C43B2B", surface: "#F5E2DE", border: "#DDA79D" },
      },
      fontFamily: {
        display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: "-0.045em", // big display headings
        eyebrow: "0.22em",    // mono uppercase labels
        label: "0.14em",
      },
      spacing: {
        section: "6rem",
        "section-lg": "8rem",
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        // Offset hard shadow — the panel "lifts" like a plate, no blur
        hard: "5px 5px 0 0 #16181D",
        "hard-sm": "3px 3px 0 0 #16181D",
        "hard-weld": "5px 5px 0 0 #E4512B",
        none: "none",
      },
      transitionTimingFunction: {
        snap: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
}
