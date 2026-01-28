import Navbar from "@/components/lib/navbar"
import Footer from "@/components/lib/footer";
import '@/styles/global.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
