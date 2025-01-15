import type { Metadata } from "next";
import "./globals.css";
import "../../public/fonts.css";
import ClientLayout from "../components/ClientLayout";

export const metadata: Metadata = {
  title: "Quvna",
  description: "Quvna website",
  icons: {
    icon: "/quvna.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/quvna.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
