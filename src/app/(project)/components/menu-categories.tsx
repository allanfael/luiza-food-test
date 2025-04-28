'use client'

import Image from 'next/image'
import hamburguer from '@/assets/images/hamburguer.png'
import pizza from '@/assets/images/pizza.png'
import all from '@/assets/images/all.webp'
import { useFilter } from '@/store/filter-store'
import { Button } from '@/components/ui/button'

export const MenuCategories = () => {
  const { setFilter, filter: selectedCategory, setOrderBy } = useFilter()


  const categories = [
    {
      id: 0,
      name: 'Todos',
      image: all,
      mode: 'all'
    },
    {
      id: 1,
      name: 'Burguer',
      image: hamburguer,
      mode: 'hamburger'
    },
    {
      id: 2,
      name: 'Pizza',
      image: pizza,
      mode: 'pizza'
    }
  ] as const
  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-purple-950">O que vai ser pra hoje?</h1>
    
      <div className='flex gap-6'>
        {categories.map((category) => (
          <button key={category.id} className="flex flex-col items-center gap-2" onClick={() => setFilter(category.mode)}>
            <Image src={category.image} width={60} height={60} alt={category.name} />
            <p className={`text-sm font-semibold ${selectedCategory === category.mode? 'text-purple-500' : 'text-purple-900'}`}>{category.name}</p>
          </button>
        ))}
      </div>

      <div className='flex gap-2 mt-4 flex-col'>
        <span className='text-sm font-medium text-muted-foreground'>Ordenar por:</span>
      
        <Button variant='outline' className='w-40' onClick={() => setOrderBy('worst')}>Menos avaliados</Button>
        <Button variant='outline' className='w-40' onClick={() => setOrderBy('best')}>Melhores avaliados</Button>
      </div>
    </div>
  )
}