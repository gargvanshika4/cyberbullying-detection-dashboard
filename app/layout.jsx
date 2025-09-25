import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  title: "Cyberbullying & Hate Speech Detection",
  description: "Frontend mockup for a detection dashboard",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50 min-h-screen flex flex-col">
        <nav className="bg-white dark:bg-gray-800 shadow-sm p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Detection Dashboard</h1>
            <div className="space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                href="/analytics"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Analytics
              </Link>
              <Link
                href="/settings"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Settings
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
