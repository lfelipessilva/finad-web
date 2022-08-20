import NextLink from 'next/link'
import styled from 'styled-components'
import { ArrowRight } from 'phosphor-react'

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
`

const NavElement = styled.div`
	font-weight: 400;
	font-size: 16px;
	line-height: 22px;
	padding: 10px;
`

const HomeSidebar = () => {
  return (
    <Container>
      <nav>
        <NavElement>
          <NextLink href=''>
            <ArrowRight size={16} weight={'bold'} />&nbsp;Home
          </NextLink>
        </NavElement>
        <NavElement>
          <NextLink href='/about'>
            <ArrowRight size={16} weight={'bold'} />&nbsp;Sobre
          </NextLink>
        </NavElement>
        <NavElement>
          <NextLink href='/pricing'>
            <ArrowRight size={16} weight={'bold'} />&nbsp;Preços
          </NextLink>
        </NavElement>
        <NavElement>
          <NextLink href='/how'>
            <ArrowRight size={16} weight={'bold'} />&nbsp;Como Usar
          </NextLink>
        </NavElement>
      </nav>
    </Container>
  )
}

export default HomeSidebar