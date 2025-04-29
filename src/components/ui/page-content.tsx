import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export const PageContent = ({ children, className }: { children: React.ReactNode, className?: ComponentProps<'div'>['className'] }) => {
  return (
    <div className={cn('flex flex-col min-h-full w-full max-w-6xl mt-6 bg-neutral-100', className)}>
      {children}
    </div>
  )
}