import type { Metadata } from "next";
import { Bebas_Neue, EB_Garamond } from "next/font/google";
import "./globals.css";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: "400",
});

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"], 
  weight: "400",
  variable: '--font-bebas-neue',
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
        {draftMode().isEnabled && (
          <div>
            <a className="p-4 bg-blue-300 block" href="/api/disable-draft">
              Disable preview mode
            </a>
          </div>
        )}
        <main>
          {children}
        </main>
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}