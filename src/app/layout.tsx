import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import SettingsToggle from "@/components/SettingsToggle";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
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
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
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
