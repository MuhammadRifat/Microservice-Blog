import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/common/components/context";
import Header from "@/common/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Mall",
  description: "A microservice blog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>

      <html lang="en">
        <body>
          <Header
            // toggle = {}
            isVisible = {false}
             />
          <main className={inter.className}>
            {children}
          </main>
        </body>
      </html>
    </AppProvider>
  );
}
