import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CruiseBoard - Processo Seletivo 2025",
  description: "Gestão de cruzeiros, navios e passageiros - Seals Solutions 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;700;800"
        />
      </head>
      <body className="bg-slate-50 min-h-screen text-[#0e151b] font-sans flex flex-col justify-between">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full bg-slate-50 border-b border-[#e7eef3] flex items-center px-4 py-3 shadow-sm">
          <h2 className="text-lg font-bold tracking-[-0.015em] flex-1 text-center pl-12">CruiseBoard</h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-xl h-12 bg-transparent text-[#0e151b]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
              </svg>
            </button>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 max-w-6xl flex-1 w-full">
          {children}
        </main>
        <footer className="w-full text-center text-xs text-[#4e7997] py-4 border-t border-[#e7eef3] bg-slate-50">
          &copy; {new Date().getFullYear()} CruiseBoard - Processo Seletivo 2025
        </footer>
      </body>
    </html>
  );
}
