import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    margin: 0;
  }

  body {
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.white};
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
  }
`;

export default GlobalStyle;
