import styled from 'styled-components'
import NextLink from 'next/link'
import Image from 'next/image'
import backgroundBubbles from '../public/bubbles_background.png'
import readingWomen from '../public/reading_women.png'
import logo from '../public/finad_logo.png'
import LogInButton from './components/buttons/LogIn'
import SignInButton from './components/buttons/SignIn'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: -1;
  background-image: url('./bubbles_background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`
const Header = styled.header`
  max-width: 1440px;
  margin-top: 44px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`

const Nav = styled.nav`
  margin-left: 15%;

  @media (max-width: 1000px) {
    display: none;
  }
`

const Link = styled.a`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  margin: 16px;
  color: black;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid black;
  }
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

  @media (max-width: 768px) {
    margin-top: 130px;
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
  padding: 40px 0px 30px 0px;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`

export default function Home() {
  return (
    <>
      <Wrapper>
        <Header>
          <Image
            alt="finad"
            src={logo}
            layout="fixed"
            width={128}
            height={40}
          />
          <Nav>
            <NextLink href="/">
              <Link>Home</Link>
            </NextLink>
            <NextLink href="/about">
              <Link>Sobre</Link>
            </NextLink>
            <NextLink href="/pricing">
              <Link>Preços</Link>
            </NextLink>
            <NextLink href="/how">
              <Link>Como Usar</Link>
            </NextLink>
          </Nav>
          <LogInButton>ENTRAR</LogInButton>
        </Header>

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
              <LogInButton>ENTRAR</LogInButton>
              <SignInButton>CADASTRAR</SignInButton>
            </ButtonsContainer>
          </TextContainer>

          <Image
            src={readingWomen}
            alt="reading women"
            width={700}
            height={634}
          />
        </Container>
      </Wrapper>
    </>
  )
}
