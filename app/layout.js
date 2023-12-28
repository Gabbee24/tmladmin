import { Inter } from 'next/font/google'
import './globals.css';
import AuthProvider from '@/utils/session/AuthProvider';
import Ss from '@/components/Ss';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Ss children={children} />
          {/* {children} */}
        </AuthProvider>
      </body>
    </html>
  )
}
