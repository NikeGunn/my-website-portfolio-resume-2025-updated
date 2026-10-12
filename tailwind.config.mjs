/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        panel: "var(--panel)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        mark: "var(--mark)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-grotesk)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        measure: "40rem",
      },
    },
  },
  plugins: [],
};
