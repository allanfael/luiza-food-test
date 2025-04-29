import { Header } from '@/components/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />

      <div className="flex mt-9 justify-center bg-neutral-100 min-h-full w-full overflow-x-auto overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
