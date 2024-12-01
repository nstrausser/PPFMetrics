import { Providers } from "@/components/providers"
import { Sidebar } from "@/components/Sidebar"
import "@/app/globals.css"

export const metadata = {
  title: 'PPF Management',
  description: 'PPF Installation Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 pl-[72px]">
              <div className="container py-6 space-y-6">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
} 