import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Texas Idea Generator | 360 Business Magician',
  description: 'Generate innovative business ideas specific to the Texas market. Part of the MBTQ Ecosystem and Vr4deaf platform to assist entrepreneurs in building, growing, and managing modular business processes.',
  keywords: ['texas', 'business', 'entrepreneur', 'idea generator', 'mbtq', 'business-services', 'startup'],
  authors: [{ name: 'Pinky Collie', url: 'https://pinkycollie.github.io' }],
  creator: 'MBTQ Ecosystem',
  publisher: 'Pinky Colli e',
  openGraph: {
    title: 'Texas Idea Generator | VR4DEAF',
    description: 'Generate innovative business ideas specific to the Texas market for entrepreneurs.',
    type: 'website',
    siteName: '360 Business Magician',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Idea Generator | Vr4deaf',
    description: 'Generate innovative business ideas specific to the Texas market for entrepreneurs.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
