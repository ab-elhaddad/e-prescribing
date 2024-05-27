import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./ui/custom/Footer";
import Navbar from "./ui/navbar/Navbar";
import PurpleHalo from "./ui/custom/PurpleHalo";
import IsAuthenticatedProvider from "./context/AuthProvider";

import { register } from "swiper/element/bundle";
register();

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "E-Prescribing",
    template: `%s | E-Prescribing`,
  },
  description: "A clinic system for managing patients and appointments.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ overflowX: "hidden" }}>
        <IsAuthenticatedProvider>
          <Navbar />
        </IsAuthenticatedProvider>
        <PurpleHalo style={{ marginLeft: "40vw", top: "40vh" }} />
        <PurpleHalo style={{ marginLeft: "40vw", top: "160vh" }} />
        <PurpleHalo style={{ marginLeft: "90vw", top: "80vh", zIndex: 20 }} />
        <PurpleHalo style={{ marginLeft: "-15vw", top: "100vh", zIndex: 20 }} />
        <PurpleHalo style={{ marginLeft: "-20vw", top: "220vh" }} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
