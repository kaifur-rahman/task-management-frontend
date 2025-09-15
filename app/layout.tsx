import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IRAI-Task Management",
  description: "Task Management app for IRAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full h-full ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div id="modal-container"></div>
        <div
          id="main-container"
          className="w-full h-full flex justify-center items-center"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
