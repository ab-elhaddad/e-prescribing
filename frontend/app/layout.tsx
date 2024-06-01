import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./ui/custom/Footer";
import Navbar from "./ui/navbar/Navbar";
import PurpleHaloGroup from "./ui/custom/PurpleHaloGroup";
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
    default: "E-Prescriping",
    template: `%s | E-Prescriping`,
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
      <body className="overflow-x-hidden">
        <IsAuthenticatedProvider>
          <Navbar />
        </IsAuthenticatedProvider>
        <div className="pt-16">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
