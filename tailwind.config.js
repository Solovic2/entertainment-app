/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryRed: "#FC4747",
        darkBlue: "#10141E",
        greyishBlue: "#5A698F",
        semiDarkBlue: "#161D2F",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      fontSize: {
        headingLg: "32px",
        headingM: "24px",
        headingXs: "18px",
        bodyM: "15px",
        bodySm: "13px",
      },

      animation: {
        scrollRight: "scrollAnimationRight  25s linear infinite alternate  ",
      },
      keyframes: {
        scrollAnimationRight: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
