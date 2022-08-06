import styled from "styled-components";

export const RoomsContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  overflow: hidden;
  width: 30%;
  border: solid var(--primary);
  border-top-left-radius: 0.5rem;
`;

export const Header = styled.div`
  width: 100%;
  height: fit-content;
  background-color: var(--primary);
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

export const List = styled.div`
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

  h2 {
    margin-top: 1rem;
    color: var(--primary);
    font-size: 1.3rem;
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
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
`;