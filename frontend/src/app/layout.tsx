import type { Metadata } from "next";
import { verdana } from "../fonts";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Hacker News",
  description:
    "Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by the investment fund and startup incubator Y Combinator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={verdana.className}>{children}</body>
    </html>
  );
}
