'use client'

import { useUserStore } from "@/store/user-store"

export const Welcome = () => {
  const { email } = useUserStore()

  return (
    <div className="mb-10">
      <h1 className="text-2xl font-semibold text-purple-950">Bem Vindo(a), {email || 'Visitante'}</h1>
    </div>
  )
}