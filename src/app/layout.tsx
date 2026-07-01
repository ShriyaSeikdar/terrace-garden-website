import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import SettingsToggle from "@/components/SettingsToggle";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Premium Terrace Garden | Award-Winning Horticulture",
  description: "A terrace garden like no other. Experience our award-winning collection of rare adeniums.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lato.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <SettingsProvider>
          {children}
          <SettingsToggle />
        </SettingsProvider>
      </body>
    </html>
  );
}
