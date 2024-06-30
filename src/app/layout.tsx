import type { Metadata } from "next";
import { Inter, Bebas_Neue, EB_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: "400",
});

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"], 
  weight: "400",
  variable: '--font-bebas-neue', // Add this line
});

export const metadata: Metadata = {
  title: "A Gallery of Artwork by Minae Lee - Made with Sanity & Next.js",
  description: "A gallery of original paintings by Minae Lee, created with Sanity.io and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.className} ${bebasNeue.variable}`}>
        {children}
      </body>
    </html>
  );
}