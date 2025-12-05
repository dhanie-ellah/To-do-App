module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3a7bfd",
          gradient: "linear-gradient(to right, #57ddff, #c058f3)",
        },

        light: {
          bg: "#fafafa",
          surface: "#e4e5f1",
          border: "#d2d3db",
          text: "#484b6a",
          textMuted: "#9394a5",
        },

        dark: {
          bg: "#161722",
          surface: "#25273c",
          surfaceSecondary: "#393a4c",
          border: "#4d5066",
          text: "#cacde8",
          textHover: "#e4e5f1",
          textMuted: "#777a92",
        },
      },
      
      screens: {
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      },
    },
  },
};
