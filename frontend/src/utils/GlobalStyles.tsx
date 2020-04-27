import { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const GlobalStyle = createGlobalStyle`
  #root {
    font-family: 'Raleway', sans-serif;
    overflow: hidden;
    font-size: ${themeGet('fontSizes.1')}px;
  }

  span, button, h1, h2, h3, h4, h5, h6, p, div {
    font-family: 'Raleway', sans-serif;
    white-space: pre-wrap;
  }

  ::-webkit-input-placeholder {
    font-family: 'Raleway', sans-serif;
  }

  * {
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    outline: none !important;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  *:focus {
    outline: none !important;
  }

  a,
  button {
    font-size: 13px;
  }

  a {
    color: inherit;
    fill: inherit;
    text-decoration: none;
  }

  body {
    min-height: 100vh;
    height: 100vh;
  }

  .Overlay {
    outline: none;
    background-color: rgba(247, 250, 252, 0.8);
  }

  .toast-size {
    width: 220px;
    height: 100px;
  }

  .ReactModal__Overlay {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    .ReactModal__Content {
      outline: none;
      background-color: white;
    }
  }

  .Toastify__toast-container--bottom-right {
    bottom: 3em;
    right: 1em; 
  }

  .Toastify__toast {
    font-size: ${themeGet('fontSizes.2')}px;
    padding: ${themeGet('space.3')}px;
    border-radius: 4px;
  }

  .Toastify__close-button {
    margin-left: ${themeGet('space.3')}px;
    font-size: ${themeGet('fontSizes.2')}px;
  }

  .Toastify__toast--info {
    background: ${themeGet('colors.primary.500')}; 
  }

  .Toastify__toast--success {
    background: ${themeGet('colors.success.500')}; 
  }

  .Toastify__toast--warning {
    background: ${themeGet('colors.warning.500')}; 
  }
`;

export default GlobalStyle;
