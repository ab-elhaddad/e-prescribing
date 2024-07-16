import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Footer from "@/app/ui/Footer";
import Navbar from "@/app/ui/Navbar";

import { register } from "swiper/element/bundle";
import { ClerkProvider } from "@clerk/nextjs";
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
      <body className="overflow-x-hidden">
          <ClerkProvider afterSignOutUrl='/home'>
            <Navbar />
            <div className="pt-16">
              {children}
              <Footer />
            </div>
          </ClerkProvider>
      </body>
    </html>
  );
}
