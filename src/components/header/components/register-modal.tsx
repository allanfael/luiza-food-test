'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Resolver, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModalContent, ModalPage } from '@/components/ui/modal'
import { ModalType } from '@/interfaces/modal'
import { ModalState, useModal } from '@/store/modal-store'

import { FormSchemaType, schema } from '@/schemas/login'
import { firebaseService } from '@/services/firebase-service'
import { FirebaseError } from 'firebase/app'

export const RegisterModal = () => {
  const setShowModal = useModal(
    (state: ModalState<ModalType>) => state.setShowModal,
  )

  const {
    formState: { isSubmitting, isDirty, errors },
    handleSubmit,
    reset,
    register,
    setError,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(schema) as Resolver<FormSchemaType>,
  })

  const userInvalid = [
    'auth/wrong-password',
    'auth/user-not-found',
  ]

  const onReset = () => {
    if (isDirty) return

    reset({
      email: '',
      password: '',
    })
  }

  const onShowLoginModal = () => {
    onReset()
    setShowModal('LOGIN')
  }

  const onSubmit = async (data: FormSchemaType) => {
    try {
      await firebaseService.register(data.email, data.password)
      onShowLoginModal()
    } catch (e) {
      const error = e as FirebaseError

      const message = error.code

      if (message === 'auth/email-already-in-use') {
        setError('email', {
          message: 'Email já cadastrado',
        })

        return
      }

      if (userInvalid.includes(message)) {
        setError('password', {
          message: 'Usuário ou senha inválido',
        })

        return
      }

      setError('password', {
        message: error.message,
      })
    }
  }

  return (
    <ModalPage title="Cadastrar Usuário" showCloseButton>
      <ModalContent>
        <div className="flex flex-col gap-6 w-xs">
          <Input
            id="email"
            label="Email"
            placeholder="Ex: maria@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            id="password"
            label="Senha"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
      </ModalContent>

      <ModalContent className="mt-16 mb-8 flex-row gap-0">
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} loading={isSubmitting} className="flex-1">
          Cadastrar
        </Button>
      </ModalContent>
    </ModalPage>
  )
}
