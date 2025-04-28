'use client'

import { ModalState, useModal } from '@/store/modal-store'
import { Button } from '../ui/button'
import { Cart } from './cart'
import { ModalType } from '@/interfaces/modal'
import { Dialog } from '../ui/dialog'
import { LoginModal } from './components/login-modal'
import { RegisterModal } from './components/register-modal'
import { useUserStore } from '@/store/user-store'
import { firebaseService } from '@/services/firebase-service'

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
        <span onClick={backToTop} className="font-bold text-white">Luiza Foods</span>
       

        <div className="flex gap-6 items-center">
          <Button 
            onClick={handleSignInSignOut} 
            variant='link' 
            className='md:flex text-white'>{email ? 'Sair' : 'Entrar'}</Button>
          <Cart />
        </div>

      </div>
    </Dialog>
  )
}