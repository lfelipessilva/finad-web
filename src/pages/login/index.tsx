import React from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import z from 'zod'
import readingWomen from '../../../public/reading_women.png'
import Header from '../../components/Header'
import { GoogleLogo } from 'phosphor-react'
import Head from 'next/head'
import { useMutation } from 'react-query'
import AuthService from '../../services/authService'
import Router from 'next/router'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import { toast } from 'react-toastify'
import { FormInput } from '../../components/form/FormInput'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import SecondaryButton from '../../components/buttons/SecondaryButton'

const validationSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Ops! está faltando seu email aqui" })
      .email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(1, { message: "Ops! está faltando sua senha aqui" })
  })

type FormValues = z.infer<typeof validationSchema>

export default function Home() {
  const { register, handleSubmit, formState: { errors }} = useForm<FormValues>({ resolver: zodResolver(validationSchema) })

  const loginUser = useMutation(
    async (user: FormValues) => await AuthService.signIn(user),
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

  const onSubmit: SubmitHandler<FormValues> = (data) => loginUser.mutate(data)

  return (
    <>
      <Head>
        <title>Finad | Entrar</title>
      </Head>
      <div className="flex flex-col w-full justify-start items-center bg-bubbles bg-cover h-screen p-4">
        <Header />
        <main className="flex flex-col h-screen justify-center gap-8 md:flex-row w-full max-w-7xl sm:justify-between items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-96">
            <h1 className="text-5xl md:text-6xl font-semibold font-sans">
              Bem-vindo<br />
              de volta!
            </h1>
            <FormInput
              register={register}
              name="email"
              type="text"
              placeholder="Email"
              error={errors.email}
            />
            <FormInput
              register={register}
              name="password"
              type="password"
              placeholder="Senha"
              error={errors.password}
            />
            <div className="flex flex-col gap-4">
              <PrimaryButton isLoading={loginUser.isLoading}>
                <span>ENTRAR</span>
              </PrimaryButton>
              {/* <SecondaryButton>
                <span className="flex gap-1">
                  <GoogleLogo size={24} weight={'bold'} />
                  LOGIN COM GOOGLE
                </span>
              </SecondaryButton> */}
            </div>
            <p className="text-center">
              ainda não tem conta?&nbsp;
              <NextLink href='/register'>
                <span className="cursor-pointer hover:opacity-60">
                  crie aqui
                </span>
              </NextLink>
            </p>
          </form>
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
