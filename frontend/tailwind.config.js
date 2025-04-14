/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fontWeight: {
          thin: "100",
          extralight: "200",
          light: "300",
          normal: "400",
          medium: "500",
          semibold: "600",
          bold: "700",
          extrabold: "800",
          black: "900",
        },
        primary: "#1976D2", // Strong Blue
        // primary: "#1E40AF", // Strong Blue
        secondary: "#F59E0B", // Amber Yellow
        danger: "#EF4444", // Red
        info: "#3B82F6", // Sky Blue
        lightBackground: "#F3F4F6", // Light Gray
        darkBackground: "#1F2937", // Dark Gray
        primaryText: "#111827", // Dark Gray
        secondaryText: "#6B7280", // Muted Gray
        border: "#D1D5DB", // Light Gray
        hoverPrimary: "#1E3A8A", // Darker Blue
        hoverSecondary: "#F59E0B", // Darker Amber
        hoverDanger: "#B91C1C", // Darker Red
      },

      spacing: {
        0: "0px",
        0.5: "2px", // 2px spacing
        1: "4px", // 4px spacing
        1.5: "6px",
        2: "8px", // 8px spacing
        2.5: "10px",
        3: "12px", // 12px spacing
        3.5: "14px", 
        4: "16px", // 16px spacing
        5: "20px",
        6: "24px", // 24px spacing
        8: "32px",
        10: "40px", // 40px spacing
        12: "48px",
        14: "56px",
        16: "64px", // 64px spacing
        20: "80px", 
        24: "96px",
        32: "128px",
        40: "160px",
        48: "192px",
        56: "224px",
        64: "256px",
      },

      borderRadius: {
        DEFAULT: "0.25rem", // 4px
        sm: "0.125rem", // 2px for small rounded corners
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        xl: "0.75rem", // 12px
        "2xl": "1rem", // 16px
        "3xl": "1.5rem", // 24px
        full: "9999px", // fully rounded
      },

      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)", // subtle shadow
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)", // basic shadow
        md: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)", // medium depth
        lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)", // large depth
        xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)", // extra large
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)", // extreme depth for modal shadows
        inset: "inset 0 2px 4px rgba(0, 0, 0, 0.05)", // inset shadow
      },

      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "3.75rem", // 60px
        "7xl": "4.5rem", // 72px
        "8xl": "6rem", // 96px
        "9xl": "8rem", // 128px
      },

      lineHeight: {
        normal: "1.5",
        relaxed: "1.75",
        tight: "1.25",
      },

      transitionDuration: {
        1000: "1000ms"
      },

      transitionTimingFunction: {
        "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
      },

      animation: {
        bounce: "bounce 1s infinite",
        fade: "fadeIn 0.5s ease-out"
      },

      container: {
        center: false,
        padding: "1rem",
      },

      screens: {
        xs: "480px",
        xxl: "1440px"
      },

      maxWidth: {
        content: "1082px", // Custom max-width
      }
    }
  },
  plugins: []
};
