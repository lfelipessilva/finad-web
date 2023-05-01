import NextLink from 'next/link'
import Image from 'next/image'
import Router from 'next/router'
import readingWomen from '../../../public/reading_women.png'
import Header from '../../components/Header'
import { GoogleLogo } from 'phosphor-react'
import Input from '../../components/Input'
import Head from 'next/head'
import { useMutation } from 'react-query'
import { Form } from '@unform/web'
import { SignUpUserProps, SignInUserProps } from '../../types/User'
import UserService from '../../services/userService'
import AuthService from '../../services/authService'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import SecondaryButton from '../../components/buttons/SecondaryButton'

export default function Home() {
  const createUser = useMutation((user: SignUpUserProps) => {
    return UserService.createUser(user)
  })

  const authenticateUser = useMutation((user: SignInUserProps) => {
    return AuthService.signIn(user)
  })

  const handleSubmit = async (data: SignUpUserProps) => {
    try {
      const createUserResponse = await createUser.mutateAsync(data)
      if (createUserResponse.status === 201) {
        const authenticateUserResponse = await authenticateUser.mutateAsync({ email: data.email, password: data.password })

        if (authenticateUserResponse.status === 201) {
          return Router.push('/app')
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Finad | Cadastrar</title>
      </Head>
      <div className="flex flex-col w-full justify-start items-center bg-bubbles bg-cover h-screen p-4">
        <Header />
        <main className="flex flex-row w-full max-w-7xl justify-between items-center">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <h1 className="text-5xl font-semibold font-sans">
              Comece a se< br />
              Organizar!
            </h1>
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                placeholder="Nome"
                name="name"
                style={{
                  width: '50%'
                }}
              />
              <Input
                name="lastName"
                type="text"
                placeholder="Sobrenome"
                style={{
                  width: '50%'
                }}
              />
            </div>
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
              <PrimaryButton isLoading={createUser.isLoading}>
                <span>
                  CRIAR CONTA
                </span>
              </PrimaryButton>
              <SecondaryButton >
                <span className="flex gap-1">
                  <GoogleLogo size={24} weight={'bold'} />
                  ENTRAR COM GOOGLE
                </span>
              </SecondaryButton>
            </div>
            <p className="text-center">
              já tem uma conta?&nbsp;
              <NextLink href='/login'>
                <span className="text-primary cursor-pointer hover:opacity-60">
                  entre aqui
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
