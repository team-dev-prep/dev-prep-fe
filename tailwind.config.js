/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        keania: ["'Keania One'", "cursive"],
      },
      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
        "3xl": "var(--text-3xl)",
        "4xl": "var(--text-4xl)",
        "5xl": "var(--text-5xl)",
      },
      colors: {
        white: "var(--color-white)",
        gray1: "var(--color-gray1)",
        gray2: "var(--color-gray2)",
        gray3: "var(--color-gray3)",
        gray4: "var(--color-gray4)",
        gray5: "var(--color-gray5)",
        gray6: "var(--color-gray6)",
        gray7: "var(--color-gray7)",
        gray8: "var(--color-gray8)",
        black: "var(--color-black)",
        background: "var(--color-background)",
        blue1: "var(--color-blue1)",
        blue2: "var(--color-blue2)",
        blue3: "var(--color-blue3)",
      },
    },
  },
  plugins: [],
};
