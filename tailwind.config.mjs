/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Include all files under pages
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Include all files under components
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Include all files under the app directory
    "./node_modules/next-nprogress-bar/**/*.js", // Ensure next-nprogress-bar is included
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom CSS variable for background
        foreground: "var(--foreground)", // Custom CSS variable for foreground
      },
    },
  },
  plugins: [],
};
