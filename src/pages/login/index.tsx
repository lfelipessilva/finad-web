import NextLink from 'next/link'
import Image from 'next/image'
import readingWomen from '../../../public/reading_women.png'
import Header from '../../components/Header'
import { GoogleLogo } from 'phosphor-react'
import Input from '../../components/Input'
import Head from 'next/head'
import { Form } from '@unform/web'
import { SignInUserProps } from '../../types/User'
import { useMutation } from 'react-query'
import AuthService from '../../services/authService'
import Router from 'next/router'

export default function Home() {
  const loginUser = useMutation((user: SignInUserProps) => {
    return AuthService.signIn(user)
  })

  const handleSubmit = async (data: SignInUserProps) => {
    const loggedInUser = await loginUser.mutateAsync(data)
    if (loggedInUser.status === 201) {
      return Router.push('/app')
    }
  }

  return (
    <>
      <Head>
        <title>Finad | Entrar</title>
      </Head>
      <div className="flex flex-col w-full justify-start items-center bg-bubbles bg-cover h-screen p-4">
        <Header />
        <main className="flex flex-row w-full max-w-7xl justify-between items-center">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <h1 className="text-5xl font-semibold font-sans">
              Bem-vindo<br />
              de volta!
            </h1>
            <Input
              name="email"
              type="email"
              placeholder="Email"
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
            />
            <div className="flex flex-col gap-4">
              <button className="rounded-xl bg-blue-500 p-3 text-2xl text-white bg-primary font-semibold hover:opacity-80 transition-all duration-200">
                ENTRAR
              </button>
              <button className="flex flex-row items-center rounded-xl bg-blue-500 p-3 text-2xl text-white bg-secondary font-semibold hover:opacity-80 transition-all duration-200">
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
