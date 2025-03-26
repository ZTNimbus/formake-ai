import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import "./globals.css";

const funnel_sans = Funnel_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Formake - Your personal AI form builder",
  description:
    "Formake is a personal AI form builder that helps you create forms with AI effortlessly. With Formake, you can easily create forms and collect data from your users in minutes. Formake is the perfect tool for anyone who wants to create forms and collect data from their users in a simple and efficient way. Try Formake today and see how easy it is to create forms with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${funnel_sans.className} antialiased`}>{children}</body>
    </html>
  );
}
