import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/700.css";
import { Locale, locales } from "@/lib/utils/i18n";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
  params: {
    lang: Locale;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang;
  // Validate that the lang parameter is a valid locale
  if (!locales.includes(lang)) {
    notFound();
  }

  return {
    title: lang === 'fa' ? 'صرافی آوستا | شریک مطمئن شما در تبادل ارز' : 'Avesta Exchange | Your Trusted Currency Exchange Partner',
    description: lang === 'fa' 
      ? 'خدمات حرفه‌ای تبادل ارز برای شهریه دانشگاه، حواله‌های شخصی، انتقالات شرکتی و بیشتر'
      : 'Professional currency exchange services for university tuition, personal remittances, corporate transfers, and more.',
  };
}

export default async function RootLayout({ children, params }: Props) {
  const lang = params.lang;
  // Validate that the lang parameter is a valid locale
  if (!locales.includes(lang)) {
    notFound();
  }

  return (
    <html lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
} 