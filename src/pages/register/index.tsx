import NextLink from "next/link"
import Image from "next/image"
import Router from "next/router"
import readingWomen from "../../../public/reading_women.png"
import Header from "../../components/Header"
import { GoogleLogo } from "phosphor-react"
import Input from "../../components/Input"
import Head from "next/head"
import { useMutation } from "react-query"
import { Form } from "@unform/web"
import { SignUpUserProps, SignInUserProps } from "../../types/User"
import UserService from "../../services/userService"
import AuthService from "../../services/authService"
import PrimaryButton from "../../components/buttons/PrimaryButton"
import SecondaryButton from "../../components/buttons/SecondaryButton"
import { FormInput } from "../../components/form/FormInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { z } from "zod"
import { ReadingWomen } from "../../components/ReadingWomen"

const validationSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Ops! está faltando seu nome aqui" }),
    lastName: z
      .string()
      .min(1, { message: "Ops! está faltando seu sobrenome aqui" }),
    email: z
      .string()
      .min(1, { message: "Ops! está faltando seu email aqui" })
      .email({ message: "Email inválido" }),
    password: z
      .string()
      .min(1, { message: "Ops! está faltando sua senha aqui" })
  })

type FormValues = z.infer<typeof validationSchema>

export default function Home() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormValues>({ resolver: zodResolver(validationSchema) })

  const createUser = useMutation(
    async (user: FormValues) => await UserService.createUser(user),
    {
      onSuccess: (response) => {
        authenticateUser.mutate({ email: response.data.email, password: getValues("password") })
      },
      onError: (error: any) => {
        toast.error("Houve um problema ao criar usuário", {
          position: "top-center",
        })
      },
    }
  );

  const authenticateUser = useMutation(
    async (user: SignInUserProps) => await AuthService.signIn(user),
    {
      onSuccess: (response) => {
        return Router.push("/app")
      },
      onError: (error: any) => {
        toast.error("Houve um problema ao autenticar", {
          position: "top-center",
        })
      },
    }
  );

  const onSubmit: SubmitHandler<FormValues> = (data) => createUser.mutate(data)

  return (
    <>
      <Head>
        <title>Finad | Cadastrar</title>
      </Head>
      <div className="flex flex-col w-full justify-start items-center bg-bubbles bg-cover h-screen p-4">
        <Header />
        <main className="flex flex-col justify-center h-full md:flex-row w-full max-w-7xl md:justify-between items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
            <h1 className="text-5xl md:text-6xl font-semibold font-sans">
              Comece a se< br />
              Organizar!
            </h1>
            <div className="flex flex-row gap-4">
              <FormInput
                register={register}
                name="name"
                type="text"
                placeholder="Nome"
                error={errors.name}
              />
              <FormInput
                register={register}
                name="lastName"
                type="text"
                placeholder="Sobreome"
                error={errors.lastName}
              />
            </div>
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
              <PrimaryButton isLoading={createUser.isLoading}>
                <span>
                  CRIAR CONTA
                </span>
              </PrimaryButton>
              {/* <SecondaryButton >
                <span className="flex gap-1">
                  <GoogleLogo size={24} weight={'bold'} />
                  ENTRAR COM GOOGLE
                </span>
              </SecondaryButton> */}
            </div>
            <p className="text-center">
              já tem uma conta?&nbsp;
              <NextLink href='/login'>
                <span className="text-primary cursor-pointer hover:opacity-60">
                  entre aqui
                </span>
              </NextLink>
            </p>
          </form>
          <ReadingWomen />
        </main>
      </div>
    </>
  )
}
