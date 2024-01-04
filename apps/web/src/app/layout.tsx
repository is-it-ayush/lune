import "~/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const externalFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "nextjs website.",
  description: "a nextjs application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={externalFont.className}>{children}</body>
    </html>
  );
}
