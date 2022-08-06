import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 60vw;
  height: 500px;
  display: flex;
`;

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  border-top-right-radius: 0.625em;
  background-color: var(--secondary);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  gap: 2em;

  h2 {
    color: var(--background);
    font-size: var(--fontExtraLarge);
  }

  img {
    width: 70%;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  border-top-right-radius: 0.625em;
  background-color: var(--secondary);
  flex-direction: column;
  justify-content: space-between;
  padding: 1em;
`;
