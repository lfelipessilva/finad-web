import styled from 'styled-components'


const SignInWithGoogleButton = styled.button`
   display: flex;
   align-items: center;
   justify-content: center;
   background: ${props => props.theme.secondary};
   color: white;
   font-weight: 600;
   letter-spacing: 0.8px;
   line-height: 44px;
   border: 0;
   min-width: 190px;
   height: 60px;
   font-size: 1.25rem;
   box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
   border-radius: 12px;
   transition: all 0.25s;
   cursor: pointer;

   &:hover {
      filter: brightness(90%);
   }
`
export default SignInWithGoogleButton