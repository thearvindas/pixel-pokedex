import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    image-rendering: pixelated;
  }

  body {
    font-family: "Press Start 2P", cursive;
    background-color: #87CEEB;
    color: #0f380f;
    line-height: 1.5;
  }

  button {
    font-family: "Press Start 2P", cursive;
    background-color: #0f380f;
    color: #98cb98;
    border: 2px solid #0f380f;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 4px;

    &:hover {
      background-color: #7bac7b;
      color: #0f380f;
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      background-color: #2c532c;
      color: #7bac7b;
      cursor: not-allowed;
      transform: none;
    }
  }

  input {
    font-family: "Press Start 2P", cursive;
    background-color: #7bac7b;
    color: #0f380f;
    border: 2px solid #0f380f;
    padding: 8px;
    font-size: 8px;
    width: 100%;
    border-radius: 4px;

    &::placeholder {
      color: #2c532c;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #0f380f;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #2c532c;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #0f380f;
    border-radius: 4px;
  }
`;

