import { Source_Serif_4, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollToTopWrapper from "../components/ScrollToTopWrapper";

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const grotesk = Schibsted_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nikhil Bhagat | AI/ML Engineer & NLP Researcher",
  description:
    "AI/ML engineer and independent NLP researcher in Nepal. LLM agents, retrieval-augmented generation, evaluation benchmarks and guardrails for low-resource languages.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F5F7" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1828" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${grotesk.variable} antialiased`}>
        <ScrollToTopWrapper />
        {children}
      </body>
    </html>
  );
}
