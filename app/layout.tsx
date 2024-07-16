import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Poppins({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: "Webify Admin Portal",
  description: "Managing webify at a single place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
        <html lang="en">
          <body className={poppins.className}>
            <ThemeProvider 
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider />
              <ToastProvider />
              {children}
            </ThemeProvider>
            </body>
        </html>
      </ClerkProvider>
  );
}
