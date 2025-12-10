import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/themes/providers/ThemeProvider";
import Header from "@/components/layout/header";
import Toaster from "@/components/layout/sonner";
import Footer from "@/components/layout/footer";
export const metadata: Metadata = {
  title: "Theme Picker",
  description: "Are you still find the best theme for you project, Try this.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Theme Picker",
    description: "Are you still find the best theme for you project, Try this.",
    url: "https://theme-picker.vercel.app",
    images: ["/assets/logo-theme-picker.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Theme Picker",
    description: "Are you still find the best theme for you project, Try this.",
    images: ["/assets/logo-theme-picker.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </head>
      <body
        className={`antialiased bg-background h-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full h-full min-h-screen flex flex-col gap-4">
            <Header />
            <main className="flex-1 flex h-full w-full min-h-0 mt-0 px-4 py-4 md:px-8 relative">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
