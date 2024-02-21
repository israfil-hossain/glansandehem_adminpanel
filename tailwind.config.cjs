/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "270px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        poppins: "Poppins",
        kaushan: "Kaushan Script",
        Montserrat: "Montserrat",
      },
      colors:{
        background: "#f5f7fa",
        primary : "#DCE102",
        secondary: "#FDB3CA"

      },
      animation:{
        'my-pulse': 'my-pulse 3s ease-in-out infinite',
      },
      keyframes:{
        'my-pulse': {
          '0%, 100%': { opacity: '2' },
          '50%': { opacity: '0.6' },
        },
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
