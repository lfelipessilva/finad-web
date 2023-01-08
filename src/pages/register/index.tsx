import styled from 'styled-components'
import NextLink from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import readingWomen from '../../../public/reading_women.png'
import Header from '../../components/Header'
import LogInButton from '../../components/buttons/LogIn'
import SignInButton from '../../components/buttons/SignIn'
import { GoogleLogo } from 'phosphor-react'
import Input from '../../components/Input'
import SignInWithGoogleButton from '../../components/buttons/SignInWithGoogle'
import { FormEvent, useState } from 'react'
import Head from 'next/head'

const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   position: absolute;
   height: 100%;
   width: 100%;
   z-index: -1;
   background-image: url('./bubbles_background.png');
   background-size: cover;
   background-repeat: no-repeat;
   background-position: center center;
`

const Container = styled.div`
   width: 90%;
   max-width: 1440px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   z-index: 1;
   margin-top: 50px;
   padding: 20px;

   @media (max-width: 800px) {
      margin-top: 16%;
      flex-direction: column;
   }
`

const TextContainer = styled.div`
   margin-top: 40px;
`

const Title = styled.p`
   font-weight: 600;
   font-size: 48px;
   line-height: 3.5rem;
`

const FormContainer = styled.form`
   margin-top: 16px;
   display: flex;
   flex-direction: column;
   width: 100%;
   max-width: 360px;
   gap: 24px;
`


const ButtonsContainer = styled.div`
   display: flex;
   width: 100%;
   justify-content: center;
   flex-direction: column;
   gap: 20px;
`

const ImageContainer = styled.div`
   @media (max-width: 800px) {
      display: none;
   }
`

const NameInputs = styled.div`
   display: flex;
   flex-direction: row;
   gap: 20px;
   max-width: 360px;
`

const NoAccount = styled.p`
   width: 100%;
   text-align: center;
   font-size: 16px;
   font-weight: 600;
`

export default function Home() {

  const [name, setName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    axios.post(`${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user`, {
      name: `${name} ${lastName}`,
      email: email,
      password: password
    })
    await fetch(`${process.env.NEXT_PUBLIC_API_ENTRYPOINT}/user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: `${name} ${lastName}`,
        email: email,
        password: password
      })
    });
  }

  return (
    <>
      <Head>
        <title>Finad | Cadastrar</title>
      </Head>
      <Wrapper>
        <Header />
        <Container>
          <FormContainer onSubmit={submitForm}>
            <Title>
              Comece a se< br />
              Organizar!
            </Title>
            <NameInputs>
              <Input
                type="text"
                placeholder="Nome"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: '50%'
                }}
              />
              <Input
                type="text"
                placeholder="Sobrenome"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                style={{
                  width: '50%'
                }}
              />
            </NameInputs>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <ButtonsContainer>
              <LogInButton style={{ width: "100%" }} type="submit">CRIAR CONTA</LogInButton>
              <SignInWithGoogleButton style={{ width: "100%" }}>
                <GoogleLogo size={24} weight={'bold'} />
                LOGIN COM GOOGLE
              </SignInWithGoogleButton>
            </ButtonsContainer>
            <NoAccount>
              já tem uma conta?&nbsp;
              <NextLink href='/login'>
                entre aqui
              </NextLink>
            </NoAccount>
          </FormContainer>

          <ImageContainer>
            <Image
              src={readingWomen}
              alt="reading women"
              width={700}
              height={634}
            />
          </ImageContainer>
        </Container>
      </Wrapper>
    </>
  )
}
