import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Header } from '@/components/app/header'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  style: 'normal',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: '3AM',
  description: '',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout(props: Readonly<RootLayoutProps>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          poppins.className,
          'dark min-h-screen max-w-7xl mx-auto lg:border-x lg:border-x-charcoal'
        )}
      >
        <Header />
        {props.children}
      </body>
    </html>
  )
}
