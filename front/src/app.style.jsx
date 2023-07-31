import styled from "styled-components";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 10px;
  max-width: 450px;
`;

export const ButtonStyled = styled.button`
  background-color: #757575;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: #bdbdbd;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #424242;
  }
`;

export const InputStyled = styled.input`
  height: 25px;
`;
