import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaRegister from "@/components/PwaRegister";

export const viewport: Viewport = {
  themeColor: "#0E234B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Lecture Quotidienne • EEDSC Bénin",
  description: "Plateforme interactive de lecture biblique quotidienne, méditation et prière de l'Église Évangélique de la Délivrance et du Salut en Christ (Cotonou, Bénin).",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo_eedsc.jpg",
    apple: "/logo_eedsc.jpg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "EEDSC Bible",
  },
  applicationName: "Lecture Quotidienne EEDSC",
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body className="antialiased selection:bg-amber-500 selection:text-slate-950" suppressHydrationWarning>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
