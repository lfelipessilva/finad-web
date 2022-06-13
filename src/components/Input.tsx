import styled from 'styled-components'

const Input = styled.input`
   border: 0;
   background: #FBFBFB;
   border-radius: 8px;
   padding: 9px 12px;
   font-size: 16px;
   border: 2px solid ${props => props.theme.primary};
   outline: none;

   &:focus {
      border: 2px solid ${props => props.theme.secondary};
      background: white;
   }
`

export default Input