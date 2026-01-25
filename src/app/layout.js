import Navbar from "@/compenents/navbar"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <Navbar/>

        {children}
      </body>
    </html>
  );
}
