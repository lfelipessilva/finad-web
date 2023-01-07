import { useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import NextLink from 'next/link'
import Image from 'next/image'
import readingWomen from '../../public/reading_women.png'
import Header from '../components/Header'
import LogInButton from '../components/buttons/LogIn'
import SignInButton from '../components/buttons/SignIn'
import HomeSidebar from '../components/HomeSidebar'

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
      flex-direction: column;
      padding: 0;
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

const SubText = styled.p`
   font-weight: 600;
   font-size: 16px;
   line-height: 24px;
   color: rgba(0, 0, 0, 0.8);
   padding: 10px 0px 50px 0px;
`

const ButtonsContainer = styled.div`
   display: flex;
   justify-content: center;
   gap: 20px;
`

const ImageContainer = styled.div`
   @media (max-width: 800px) {
      display: none;
   }
`
export default function Home() {
  return (
    <>
      <Head>
        <title>Finad | Home</title>
      </Head>
      <Wrapper>
        <Header />
        <Container>
          <TextContainer>
            <Title>
              Se organize<br />
              Como<br />
              Em Nenhum<br />
              Outro Lugar
            </Title>
            <SubText>
              Sua vida financeira organizada<br />
              de maneira completa, em 1<br />
              só lugar.
            </SubText>
            <ButtonsContainer>
              <NextLink href='/login'>
                <LogInButton>ENTRAR</LogInButton>
              </NextLink>
              <NextLink href='/register'>
                <SignInButton>CADASTRAR</SignInButton>
              </NextLink>
            </ButtonsContainer>
          </TextContainer>

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
