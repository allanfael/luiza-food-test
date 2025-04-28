import { Header } from '@/components/header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-full w-full">
      <Header />

      <div className="flex mt-16 justify-center bg-[#F5F5F5] min-h-screen w-full overflow-x-auto overflow-y-auto p-6">
        {children}
      </div>
    </div>
  )
}
