import "@/app/globals.css";

import { Toaster } from "sonner";

import Providers from "@/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>

        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  );
}