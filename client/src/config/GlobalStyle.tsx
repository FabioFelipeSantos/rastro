import { createGlobalStyle } from "styled-components";
import type { AppDefaultTheme } from "../types/theme";

export const GlobalStyle = createGlobalStyle<{ theme: AppDefaultTheme }>`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    list-style: none;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.sizing(1.6)};
    transition: background-color 0.2s ease, color 0.3s ease;
    line-height: 1.5;
  }

  a {
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
    transition: all 0.25 ease-out;

    &:hover {
      text-decoration: underline;
      transform: scale(1.02);
      color: ${({ theme }) => theme.changeBrightness(theme.colors.link)}
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block
  }
`;
