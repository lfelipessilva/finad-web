import styled from 'styled-components'


const LogInButton = styled.button`
   background: ${props => props.theme.primary};
   color: white;
   font-weight: 600;
   letter-spacing: 1px;
   line-height: 44px;
   border: 0;
   width: 156px;
   height: 60px;
   font-size: 1.4rem;
   box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
   border-radius: 12px;
   transition: all 0.2s;
   cursor: pointer;

   &:hover {
      filter: brightness(90%);
   }
`

export default LogInButton