'use client'

import { ModalState, useModal } from '@/store/modal-store'
import { Button } from '../ui/button'
import { ModalType } from '@/interfaces/modal'
import { Dialog } from '../ui/dialog'
import { LoginModal } from './components/login-modal'
import { RegisterModal } from './components/register-modal'
import { useUserStore } from '@/store/user-store'
import { firebaseService } from '@/services/firebase-service'
import logo from '@/assets/images/logo.svg'
import Image from 'next/image'
import { MapPin, UserRound } from 'lucide-react'

export const Header = () => {
  const setShowModal = useModal((state: ModalState<ModalType>) => state.setShowModal)
  const showModal = useModal((state: ModalState<ModalType>) => state.showModal)
  const modalType = useModal((state: ModalState<ModalType>) => state.modalType)

  const { email, reset } = useUserStore()

  const handleSignInSignOut = async () => {
    if (email) {
      await firebaseService.logout()
      reset()
      return
    }

    setShowModal('LOGIN')
  }

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Dialog open={showModal}>
      {modalType === 'REGISTER' && <RegisterModal />}
      {modalType === 'LOGIN' && <LoginModal />}

      <div className="fixed top-0 left-0 z-50 h-16 w-full bg-purple-900 justify-between items-center flex px-6">
        <Image src={logo} alt="logo" className="w-8" onClick={backToTop} />

        <div className="flex gap-2 items-center">
          <MapPin size={18} className="text-white" />
          <div>
            <p className="text-xs font-semibold text-purple-200">entregando em</p>
            <p className="text-sm font-semibold text-white">Rua Mandaguari, 198</p>
          </div>

        </div>

        <div className="flex items-center">
         {
          !!email ? (
            <Button 
            onClick={handleSignInSignOut} 
            variant='link' 
            className='md:flex text-white'>Sair</Button>
          ) : (
           <UserRound size={20} className='text-white' onClick={handleSignInSignOut} />
          )
         }
        </div>

      </div>
    </Dialog>
  )
}