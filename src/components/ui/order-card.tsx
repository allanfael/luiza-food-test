import { cn } from '@/lib/utils'
import React, { ComponentProps } from 'react'

const Container = ({ children, className }: { children: React.ReactNode, className?: ComponentProps<'div'>['className'] }) => (
  <div className={cn('flex flex-col gap-2 p-4 bg-white mt-1', className)}>
    {children}
  </div>
)

 const Header = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-between items-center mb-2">
    {children}
  </div>
 )

 const Required = () => (
  <div className="px-2 py-1 bg-neutral-700 rounded-md">
    <span className="font-semibold text-xs text-white">obrigatório</span>
  </div>
 )

const Title = ({title}: {title: string}) => (
  <span className="font-semibold mb-1">{title}</span>
)

const Subtitle = ({text}: {text: string}) => {
  return (
    <span className="text-xs font-medium text-neutral-500">{text}</span>
  )
}

const Body = ({ children, className }: { children: React.ReactNode, className?: ComponentProps<'div'>['className'] }) => {
  return (
    <div className={cn('flex flex-col mt-2', className)}>
      {children}
    </div>
  )
}

export const OrderCard = {
  Container,
  Header,
  Title,
  Subtitle,
  Body,
  Required
}