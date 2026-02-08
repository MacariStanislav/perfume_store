import Navbar from "@/components/lib/navbar"
import Footer from "@/components/lib/footer"
import Providers from "@/components/Providers"
import '@/styles/global.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Navbar />
          <main className="content">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
