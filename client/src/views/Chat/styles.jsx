import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 60vw;
  height: 575px;
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

export const UsersContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 81% 9%;
  overflow: hidden;
`;

export const Header = styled.div`
  width: 100%;
  height: fit-content;
  background-color: var(--primary);
  border-top-left-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7em;

  h2 {
    color: var(--background);
    display: inline-block;
  }

  img {
    width: 10%;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  margin: 0.8rem 0;

  &::-webkit-scrollbar {
    width: 0.35rem;
    &-thumb {
      background-color: var(--primary);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  .user {
    background-color: var(--primary);
    min-height: 5rem;
    cursor: pointer;
    width: 90%;
    border-radius: 0.2rem;
    padding: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;

    h3 {
      color: var(--background);
    }
  }

  .selected {
    background-color: var(--secondary);

    h3 {
      color: var(--primary);
    }
  }
`;

export const Foot = styled.div`
  width: 100%;
  height: fit-content;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7em;

  h2 {
    color: var(--background);
    display: inline-block;
  }
`;
