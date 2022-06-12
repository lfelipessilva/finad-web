import styled from 'styled-components'


const SignInButton = styled.button`
   background: ${props => props.theme.colors.secondary};
   color: white;
   font-weight: 600;
   letter-spacing: 0.8px;
   line-height: 44px;
   border: 0;
   width: 240px;
   height: 74px;
   font-size: 1.8rem;
   box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
   border-radius: 12px;
   transition: all 0.25s;
   cursor: pointer;

   &:hover {
      filter: brightness(90%);
   }
`
export default SignInButton