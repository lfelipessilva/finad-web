import styled from 'styled-components'
import NextLink from 'next/link'
import Image from 'next/image'
import readingWomen from '../../../public/reading_women.png'
import Header from '../../components/Header'
import LogInButton from '../../components/buttons/LogIn'
import SignInButton from '../../components/buttons/SignIn'
import { CookingPot, GoogleLogo } from 'phosphor-react'
import Input from '../../components/Input'
import SignInWithGoogleButton from '../../components/buttons/SignInWithGoogle'
import Head from 'next/head'
import { useEffect } from 'react'
import { Form } from '@unform/web'
import { SignInUserProps } from '../../types/User'
import { useMutation, dehydrate, QueryClient, useQuery } from 'react-query'
import AuthService from '../../services/authService'
import Router from 'next/router'
import IncomeService from '../../services/incomeService'

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

const Title = styled.h2`
  font-weight: 600;
  font-size: 48px;
  line-height: 3.5rem;
`

const FormContainer = styled(Form)`
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

const NoAccount = styled.p`
   width: 100%;
   text-align: center;
   font-size: 16px;
   font-weight: 600;
`

export default function Home(props: any) {

  const { data } = useQuery("incomes", () =>
    IncomeService.findAll()
  );

  return (
    <>
      <Head>
        <title>Finad | Entrar</title>
      </Head>
      <Wrapper>
        <Header />

        <ImageContainer>
          <Image
            src={readingWomen}
            alt="reading women"
            width={700}
            height={634}
          />
        </ImageContainer>
      </Wrapper>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  // await queryClient.prefetchQuery('incomes')

  await queryClient.prefetchQuery("incomes", () =>
    IncomeService.findAll()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
