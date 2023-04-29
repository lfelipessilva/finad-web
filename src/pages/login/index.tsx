import React, { useRef } from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import z from 'zod'
import { parseZodErrors } from '../../utils/parseZodErros'
import readingWomen from '../../../public/reading_women.png'
import Header from '../../components/Header'
import { GoogleLogo } from 'phosphor-react'
import Input from '../../components/Input'
import Head from 'next/head'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { SignInUserProps } from '../../types/User'
import { useMutation } from 'react-query'
import AuthService from '../../services/authService'
import Router from 'next/router'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import { toast } from 'react-toastify'

export default function Home() {
  const formRef = useRef<FormHandles>(null)

  const loginUser = useMutation(
    async (user: SignInUserProps) => await AuthService.signIn(user),
    {
      onSuccess: (data) => {
        return Router.push('/app')
      },
      onError: (error: any) => {
        toast.error('Usuário Inválido', {
          position: 'top-center',
        })
      },
    }
  );

  const handleSubmit = async (data: SignInUserProps) => {
    const schema = z
      .object({
        email: z.string().email({ message: 'Email inválido' }),
        password: z.string().nonempty({ message: 'Senha inválida' }),
      })
      .safeParse(data)

    if (!schema.success) {
      formRef.current?.setErrors({}) // this remove all errors before setting them again

      const errors = parseZodErrors(schema.error)
      errors.map(error => {
        return formRef.current?.setFieldError(error.inputName, error.message)
      })
      return
    }

    return loginUser.mutate(data)
  }

  return (
    <>
      <Head>
        <title>Finad | Entrar</title>
      </Head>
      <div className="flex flex-col w-full justify-start items-center bg-bubbles bg-cover h-screen p-4">
        <Header />
        <main className="flex flex-row w-full max-w-7xl justify-between items-center">
          <Form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <h1 className="text-5xl font-semibold font-sans">
              Bem-vindo<br />
              de volta!
            </h1>
            <Input
              name="email"
              type="text"
              placeholder="Email"
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
            />
            <div className="flex flex-col gap-4">
              <PrimaryButton isLoading={loginUser.isLoading}>
                <span>ENTRAR</span>
              </PrimaryButton>
              <button className="flex flex-row justify-center items-center selection:items-center rounded-xl bg-blue-500 p-3 text-2xl text-white bg-secondary font-semibold hover:opacity-80 transition-all duration-200">
                <GoogleLogo size={24} weight={'bold'} />
                LOGIN COM GOOGLE
              </button>
            </div>
            <p className="text-center">
              ainda não tem conta?&nbsp;
              <NextLink href='/register'>
                <span className="text-primary cursor-pointer hover:opacity-60">
                  crie aqui
                </span>
              </NextLink>
            </p>
          </Form>

          <div>
            <Image
              src={readingWomen}
              alt="reading women"
              width={700}
              height={634}
            />
          </div>
        </main>
      </div>
    </>
  )
}
