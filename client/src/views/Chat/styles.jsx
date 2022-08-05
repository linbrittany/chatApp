import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 60vw;
  height: 70vh;
  display: flex;
`;

export const MainContainer = styled.div`
  display: flex;
  width: 70%;
  height: 100%;
  border-top-right-radius: 0.625em;
  background-color: var(--secondary);
  flex-direction: column;
`;

export const RoomsContainer = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  height: 100%;
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

export const RoomsList = styled.div`
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

  .room {
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
