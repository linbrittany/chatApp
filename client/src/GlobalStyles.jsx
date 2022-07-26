import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle `
  :root {
    --background: #F6EEE0;
    --primary: #A45C40;
    --secondary: #E4B7A0;
    --tertiary: #C38370;
    --fontExtraLarge: 2.5rem;
    --fontLarge: 1.45rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
    --maxWidth: 1280px;
  }

  * {
    box-sizing: border-box;
    font-family: 'Roboto Light', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;

    p {
      font-size: 1rem;
      margin: 0;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0;
    }

    h2 {
      font-size: 1.45rem;
      font-weight: bold;
      margin: 0;
    }
  }
`;

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export const PageContainer = styled.div`
  background: var(--background);
  width: 100%;
  flex: 1;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h3`
  color: var(--background);
  font-size: var(--fontExtraLarge);
  margin: 0 0 15px 0;
`;

export const Request = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  gap: 0.1rem;
  margin-top: 0.5em;

  p {
    font-size: var(--fontSmall);
    margin: 0;
    color: var(--background);
  }

  button {
    background: transparent;
    border: none;
    text-decoration: underline;
    font-size: var(--fontSmall);
    color: var(--background);

    &:hover {
      color: black;
    }
  }
`;