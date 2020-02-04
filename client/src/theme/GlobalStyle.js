import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    font-family: Montserrat, sans-serif;
    font-size: 24px;
  }
`;

export default GlobalStyle;
