import type { Metadata } from "next";
import "@/styles/globals.css";




import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./providers/ThemeProvider";
import Header from "./Componets/Header";
import { Toaster } from "sonner";
import AppSidebar from "./Componets/AppSidebar";
import NoteProvider from "./providers/noteprovider";


export const metadata: Metadata = {
  title: "GOAT Notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NoteProvider>
            <SidebarProvider>
              <AppSidebar />

              <div className="flex min-h-screen w-full flex-col">
                <Header />

                <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
                  {children}
                </main>
              </div>
            </SidebarProvider>

            <Toaster />
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
