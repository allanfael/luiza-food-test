import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import '@/config/firebase'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})


export const metadata: Metadata = {
  title: "Luiza Food",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${nunito.variable} ${geistSans.variable} ${geistMono.variable} bg-background`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
