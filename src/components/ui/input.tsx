/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Label } from './label'

const input = tv({
  base: 'flex h-10 text-gray-600 border-[1.5px] bg-transparent rounded-md gap-2 focus-visible:ring-2 focus-visible:ring-primary',
  variants: {
    variant: {
      default: '',
      focused: 'border-primary border-2',
      disabled: 'opacity-80 bg-zinc-300 border-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type InputProps = React.ComponentProps<'input'> &
  React.ComponentProps<'textarea'> &
  VariantProps<typeof input>

interface Props extends InputProps {
  error?: string
  label?: string
  id: string
  disabled?: boolean
  variant?: 'default' | 'focused' | 'disabled'
  children?: React.ReactNode
  containerClassName?: ComponentProps<'input'>['className']
}

const Input = React.forwardRef<any, Props>(
  (
    {
      className,
      containerClassName,
      type,
      label,
      id,
      disabled,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('flex flex-col gap-2', containerClassName)}>
        <Label
          htmlFor={id}
          className="text-sm font-medium text-black dark:text-white"
        >
          {label}
        </Label>
        <div className={input({ className, variant })}>
          <input
            ref={ref}
            id={id}
            type={type}
            className={
              'ring-offset-background placeholder:text-muted-foreground flex w-full rounded-md text-sm font-medium file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-medium hover:cursor-text focus-visible:outline-none disabled:cursor-not-allowed'
            }
            disabled={disabled}
            {...props}
          />
        </div>
        {props.error ? (
          <p className="text-xs font-normal text-red-500">{props.error}</p>
        ) : null}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
