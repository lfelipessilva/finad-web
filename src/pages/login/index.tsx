import styled from 'styled-components'
import NextLink from 'next/link'
import Image from 'next/image'
import readingWomen from '../../../public/reading_women.png'
import Header from '../../components/Header'
import LogInButton from '../../components/buttons/LogIn'
import SignInButton from '../../components/buttons/SignIn'
import { GoogleLogo } from 'phosphor-react'
import Input from '../../components/Input'
import SignInWithGoogleButton from '../../components/buttons/SignInWithGoogle'

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

const FormContainer = styled.div`
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
export default function Home() {
  return (
    <>
      <Wrapper>
        <Header />
        <Container>
          <FormContainer>
            <Title>
              Bem-vindo<br />
              de volta!
            </Title>
            <Input
              type="email"
              placeholder="Email"
            />
            <Input
              type="password"
              placeholder="Senha"
            />
            <ButtonsContainer>
              <LogInButton style={{ width: "100%" }}>ENTRAR</LogInButton>
              <SignInWithGoogleButton style={{ width: "100%" }}>
                <GoogleLogo size={24} weight={'bold'} />
                LOGIN COM GOOGLE
              </SignInWithGoogleButton>
            </ButtonsContainer>
            <NoAccount>
              ainda não tem conta?&nbsp;
              <NextLink href='/register'>
                crie aqui
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
