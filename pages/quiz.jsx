import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

// Components
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import LoadingScreen from '../src/components/LoadingScreen';
import AlternativesForm from '../src/components/AlternativesForm';

import db from '../db.json';

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
                  type="radio"
                  value={selectedAlternative}
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
export default function Quiz() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [questionIndex, setQuestionIndex] = useState(0);
  const router = useRouter();

  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];

  function onFormSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function handleGoToResult() {
    router.push(`/result?name=${router.query.name}`);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1310);
  }, []);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <img src={db.internetImg} alt="Internet Icon" className="internetIcon" />

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

        {screenState === screenStates.LOADING && <LoadingScreen />}

        {screenState === screenStates.RESULT && handleGoToResult()}

      </QuizContainer>

      <GitHubCorner projectUrl="/" goBack />
    </QuizBackground>
  );
}

QuestionWidget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  router: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
