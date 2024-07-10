import type { Config } from "tailwindcss";

const fontSizes: Record<
  string,
  [
    fontSize: string,
    configuration: Partial<{
      lineHeight: string;
      letterSpacing: string;
      fontWeight: string | number;
    }>
  ]
> = {};

for (let i = 1; i <= 100; i++) {
  fontSizes[`${i}vw`] = [`${i}vw`, { lineHeight: "1" }];
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "blue-bottom": "0 6px 8px rgba(0, 0, 255, 0.09)",
      },
      fontSize: {
        "10xl": "10rem",
        ...fontSizes,
      },
    },
  },
  plugins: [],
};
export default config;
