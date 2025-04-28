import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

export const Loader = (props: React.SVGProps<SVGSVGElement>) => (
  <div className='flex items-center justify-center w-full mt-10'>
    <div
      className={cn(
        'flex h-32 w-40 flex-col items-center justify-center rounded-lg shadow-md',
        props.className,
      )}
    >
      <LoaderCircle className={'text-primary relative h-10 w-10 animate-spin'} />

      <span className="text-muted-foreground mt-6">Carregando...</span>
    </div>
  </div>
)
