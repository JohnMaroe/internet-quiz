/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Components
import AlternativesForm from '../../components/AlternativesForm';
import Widget from '../../components/Widget';
import QuizBackground from '../../components/QuizBackground';
import GitHubCorner from '../../components/GitHubCorner';
import QuizContainer from '../../components/QuizContainer';
import Button from '../../components/Button';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  router,
  totalQuestions,
  onFormSubmit,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);

  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  function addToLocalStorageArray(arrayName, newValue) {
    let existing = localStorage.getItem(arrayName);
    existing = existing ? existing.split(',') : [];

    existing.push(newValue);
    localStorage.setItem(arrayName, existing.toString());
  }

  function handleAnswer(result) {
    addToLocalStorageArray('results', result);
  }

  return (
    <Widget>
      <Widget.Header>
        Pergunta {questionIndex + 1} de {`${totalQuestions}`}
      </Widget.Header>

      <img
        src={question.image}
        alt="Descrição"
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />

      <Widget.Content>
        {questionIndex === 0 && <p className="greetings">Fala <strong>{router.query.name}</strong>, preparado?</p>}

        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          if (isCorrect) {
            handleAnswer(true);
          } else {
            handleAnswer(false);
          }
          setIsQuestionSubmited(true);

          setTimeout(() => {
            setSelectedAlternative(undefined);
            onFormSubmit();
            setIsQuestionSubmited(false);
          }, 1.35 * 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  checked={isSelected}
                  type="radio"
                />
                <i className="fas fa-check" />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function Quiz({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [questionIndex, setQuestionIndex] = useState(0);
  const router = useRouter();

  const totalQuestions = externalQuestions.length;
  const question = externalQuestions[questionIndex];

  function onFormSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1310);
  }, []);

  return (
    <QuizBackground backgroundImage={externalBg.bg}>

      <QuizContainer>

        {screenState === screenStates.QUIZ
          && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              router={router}
              onFormSubmit={onFormSubmit}
              totalQuestions={totalQuestions}
            />
          )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget />}

      </QuizContainer>

      <GitHubCorner projectUrl="/" goBack />
    </QuizBackground>
  );
}
