import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.wrong};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 240px;
  height: 40px;
  padding: 10px 16px;
  margin-top: 10px;

  font-weight: bold;
  font-size: 12px;
  line-height: 1;
  border: 0;
  outline: 0;
  overflow: hidden;

  transition: .3s;
  cursor: pointer;

  &:hover,
  &:focus {
    opacity: .6;
  }
  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }
`;

export default Button;
