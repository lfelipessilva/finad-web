import styled from 'styled-components'


const LogInButton = styled.button`
   background: ${props => props.theme.colors.primary};
   color: white;
   font-weight: 600;
   letter-spacing: 1px;
   line-height: 44px;
   border: 0;
   width: 170px;
   height: 74px;
   font-size: 1.8rem;
   box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
   border-radius: 12px;
   transition: all 0.2s;
   cursor: pointer;

   &:hover {
      filter: brightness(90%);
   }
`
// const LogInButton = () => {

// }

export default LogInButton