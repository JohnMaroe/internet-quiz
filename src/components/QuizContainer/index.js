import styled from 'styled-components';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 80px;
  margin: auto 10%;
  float: right;

  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
    float: none;
    margin-top: 50px;
  }
`;

export default QuizContainer;