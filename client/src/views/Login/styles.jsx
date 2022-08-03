import styled from "styled-components";

export const Wrapper = styled.form`
  background: var(--primary);
  width: 30vw;
  padding: 20px 40px;
  border-radius: 12px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  color: var(--background);
  font-size: 1.25em;
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

export const Error = styled.p`
  font-size: 1em;
  text-transform: none;
  color: var(--background);
  letter-spacing: 0;
  margin: 0.35rem 0 0.5rem 0;
  align-self: center;
`;