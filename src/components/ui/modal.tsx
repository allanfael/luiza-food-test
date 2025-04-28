import { DialogContent } from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { cva } from 'class-variance-authority'
import { CircleX } from 'lucide-react'
import { ComponentProps } from 'react'

import {
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ModalState, useModal } from '@/store/modal-store'

import { ScrollArea } from './scroll-area'
import { ModalType } from '@/interfaces/modal'

const styles = cva(
  'flex h-fit max-h-[90vh] flex-col rounded-md overflow-hidden justify-center lg:max-w-[80rem]',
)

interface Props extends ComponentProps<'div'> {
  title: string
  showCloseButton?: boolean
  children: React.ReactNode
}

export const ModalPage = ({
  title,
  children,
  className,
  showCloseButton,
}: Props) => {
  const closeModal = useModal((state: ModalState<ModalType>) => state.resetModal)

  return (
    <DialogOverlay className="flex h-screen w-screen items-center justify-center py-8">
      <DialogContent
        className={cn(styles(), className)}
        aria-describedby="description"
      >
        <VisuallyHidden>
          <DialogTitle>Hidden Title for Accessibility</DialogTitle>
        </VisuallyHidden>

        <DialogHeader className="border-stroke h-12 min-h-12 flex-row items-center justify-between border-b bg-white px-6">
          <div className="flex items-center gap-4">
            <span className="font-medium text-black dark:text-white">
              {title}
            </span>
          </div>
          {showCloseButton && (
            <span className="text-sm">
              <CircleX onClick={closeModal} />
            </span>
          )}
        </DialogHeader>

        <ScrollArea className="flex w-full flex-col bg-white px-6">
          {children}
        </ScrollArea>
      </DialogContent>
    </DialogOverlay>
  )
}

interface ModalContentProps extends ComponentProps<'div'> {
  children: React.ReactNode
  title?: string
}

export const ModalContent = ({
  children,
  title,
  ...props
}: ModalContentProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-6', props.className)}>
      <span className="text-xl font-bold text-black dark:text-white">
        {title}
      </span>
      {children}
    </div>
  )
}
