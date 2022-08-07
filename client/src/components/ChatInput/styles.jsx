import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--secondary);
  padding: 0 1rem;
  gap: 1em;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
`;

export const EmojiContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;

  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: var(--primary);
      cursor: pointer;
    }
    .emoji-picker-react {
      position: absolute;
      top: -350px;
      background-color: var(--secondary);
      box-shadow: none;
      border: solid var(--primary);

      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: var(--primary);
        width: 5px;
        &-thumb {
          background-color: var(--background);
        }
      }
      .emoji-categories {
        color: var(--primary);
        button {
          filter: contrast(0);
        }
      }
      .emoji-search {
        background-color: transparent;
        border-color: var(--primary);
        color: var(--primary);
      }
      .emoji-group:before {
        background-color: var(--primary);
      }
    }
  }
`;

export const InputContainer = styled.form`
  width: 100%;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: #a45c4090;
  padding: 0.3em 0.5em 0.3em 0;

  input {
    width: 90%;
    height: 35px;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 0.3em 0.7em 0.3em 0.9em;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary);
    border: none;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
      svg {
        font-size: 1rem;
      }
    }
    svg {
      font-size: 1.3rem;
      color: var(--background);
    }
  }
`;
