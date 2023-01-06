import NextLink from 'next/link'
import Image from 'next/image'
import logo from '../../public/finad_logo.png'
import styled from 'styled-components'
import LogInButton from './buttons/LogIn'
import { List } from 'phosphor-react'
import HomeSidebar from './HomeSidebar'
import { useState } from 'react'

const Container = styled.header`
   max-width: 1440px;
   margin-top: 44px;
   width: 90%;
   display: flex;
   justify-content: space-between;
   align-items: center;

   @media (max-width: 768px) {
      margin-top: 12px;
   }
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

const Header = () => {

  const [isHomeSidebarOpen, setIsHomeSidebarOpen] = useState<boolean>(false)

  return (
    <Container>
      <NextLink href='/'>
        <Image
          alt="finad"
          src={logo}
          layout="fixed"
          width={128}
          height={40}
          style={{
            cursor: 'pointer'
          }}
        />
      </NextLink>
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

      {isHomeSidebarOpen &&
        <>
          <div onClick={() => setIsHomeSidebarOpen(true)}>
            <List size={32} />
          </div>
          <HomeSidebar
            setIsHomeSidebarOpen={setIsHomeSidebarOpen}
          />
        </>
      }
      {!isHomeSidebarOpen &&
        <NextLink href='/login'>
          <LogInButton>ENTRAR</LogInButton>
        </NextLink>
      }
    </Container>
  )
}

export default Header