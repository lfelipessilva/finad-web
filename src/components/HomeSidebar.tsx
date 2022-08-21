import NextLink from 'next/link'
import styled from 'styled-components'
import { ArrowRight, X } from 'phosphor-react'

const Container = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	right: 0;
	top: 0;
	width: 40%;
	height: 100%;
	background: white;
	box-shadow: 0px 4px 60px 30px rgba(0, 0, 0, 0.25);
  z-index: 5;
`

const CloseIcoinContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`

const NavElement = styled.div`
	font-weight: 400;
	font-size: 16px;
	line-height: 22px;
	padding: 10px;
  margin: 4px;
  display: flex;
  align-items: center;
  border-radius: 22px;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const HomeSidebar = ({setIsHomeSidebarOpen}: any) => {

  return (
    <Container>
      <CloseIcoinContainer onClick={() => setIsHomeSidebarOpen(false)}>
        <X size={24} weight={'bold'} />
      </CloseIcoinContainer>
      <nav>
        <NavElement>
          <NextLink href=''>
            <>
              <ArrowRight size={16} weight={'bold'} />
              <p>Home</p>
            </>
          </NextLink>
        </NavElement>
        <NavElement>
          <NextLink href='/about'>
            <>
              <ArrowRight size={16} weight={'bold'} />
              <p>Sobre</p>
            </>
          </NextLink>
        </NavElement>
        <NavElement>
          <NextLink href='/pricing'>
            <>
              <ArrowRight size={16} weight={'bold'} />
              <p>Preços</p>
            </>
          </NextLink>
        </NavElement>
        <NavElement>
          <NextLink href='/how'>
            <>
              <ArrowRight size={16} weight={'bold'} />
              <p>Como Usar</p>
            </>
          </NextLink>
        </NavElement>
      </nav>
    </Container>
  )
}

export default HomeSidebar