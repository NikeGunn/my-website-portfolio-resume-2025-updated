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

export const metadata = {
  title: "Nikhil Bhagat",
  description: "Full-Stack Developer | AI/ML/DL & Gen AI Enthusiast | Innovator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-gray-900 to-black`}>
  
        {/* Main Content */}
        <main>
          {children} {/* This renders the page content dynamically */}
        </main>
      </body>
    </html>
  );
}
