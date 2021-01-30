import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }

  strong {
    color: ${({ theme }) => theme.colors.wrong};
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};

  h1 {
    font-size: 20px;
    padding: 12px;
    color: #ddd;
  }
  
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 24px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }

  .greetings {
    font-size: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  div {
    display: flex;
    align-items: baseline;
    justify-content: center;
    flex-direction: column;

    h3 {
      font-size: 24px;

      i {
        margin-right: 20px;
        color: #ddd;
        font-size: 24px;
      }
      a {
        color: ${({ theme }) => theme.colors.contrastText};
        text-decoration: none;
      }
    }
  }
`;

Widget.Topic = styled.a`
  position: relative;
  width: 290px;

  color: ${({ theme }) => theme.colors.contrastText};
  background-color: ${({ theme }) => `${theme.colors.primary}40`};
  outline: 0;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius};

  padding: 12px 24px;
  margin-bottom: 10px;
  transition: .3s;
  display: flex;
  align-items: center;
  justify-content: left;
  
  cursor: pointer;
  
  &:hover,
  &:focus {
    opacity: .7;
  }

  input {
    margin-right: 16px;
    display: none;
  }

  i {
    position: absolute;
    left: 4px;
    top: 4px;
    font-size: 12px;
    display: none;
  }

  & input:checked ~ i {
    display: block;
    color: ${({ theme }) => theme.colors.wrong};
  }
`;

export default Widget;
