import styled from "styled-components";

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
  gap: 1em;
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  height: 93%;
  &::-webkit-scrollbar {
    width: 0.25rem;
    &-thumb {
      background-color: #ffffff39;
      border-radius: 1rem;
    }
  }

  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 45%;
      overflow-wrap: break-word;
      padding: 0.85rem;
      color: var(--background);
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }

    p {
      font-size: 1rem;
    }
  }

  .sended {
    justify-content: flex-end;
    padding-right: 0.5em;

    .content {
      background-color: var(--primary);
      border-radius: 20px 20px 3px 20px;
    }
  }

  .received {
    justify-content: flex-start;

    .content {
      background-color: var(--primary);
      border-radius: 20px 20px 20px 3px;

      h3 {
        margin-bottom: 0.2em;
      }
    }
  }
`;
