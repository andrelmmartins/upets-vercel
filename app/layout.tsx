import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import Providers from "./providers";
import AuthProvider from "@/src/context/AuthProvider";

const font = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "UPets",
  description: "Sistema de registro de animais da UFCG Campus Campina Grande",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={font.className}>
        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
