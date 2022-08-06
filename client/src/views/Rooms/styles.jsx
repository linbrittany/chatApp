import styled from "styled-components";

export const MainContainer = styled.div`
  width: 60vw;
  height: 500px;
  display: flex;
  justify-content: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  border-top-right-radius: 0.625em;
  background-color: var(--secondary);
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1em;

  h2 {
    color: var(--primary);
    margin-bottom: 0.625em;
  }
`;

export const Label = styled.label`
  color: var(--primary);
  font-size: 1.35em;
  margin: 0 0 8px 0;
`;

export const Input = styled.input`
  border-radius: 6px;
  border: 1px solid var(--primary);
  padding: 6px;
  color: var(--primary);
  margin-bottom: 8px;
  font-size: 18px;
  background-color: var(--secondary);
  width: 90%;
`;

export const Button = styled.button`
  background: var(--primary);
  color: var(--background);
  border-radius:10px;
  text-align: center;
  cursor: pointer;
  border: 1px solid var(--primary);
  font-weight: 600;
  font-size: 18px;
  padding: 7px 15px;
  height: fit-content;
  align-self: center;
  margin-top: 0.5em;

  &:hover {
    color: var(--secondary);
  }
`;

export const Error = styled.p`
  font-size: 1em;
  text-transform: none;
  color: var(--primary);
  letter-spacing: 0;
  margin: 0.35rem 0 0.5rem 0;
  align-self: center;
`;