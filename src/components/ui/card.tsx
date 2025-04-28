import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: ComponentProps<'div'>['className']
}) => {
  return (
    <div
      className={cn(
        'h-fit w-full rounded-lg bg-white p-4 shadow-md inset-shadow-sm shadow-gray-500/10 dark:border-gray-700 dark:bg-gray-800',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: ComponentProps<'h2'>['className']
}) => {
  return <h2 className={cn('text-xl font-semibold', className)}>{children}</h2>
}
