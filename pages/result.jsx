import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// Components
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';

import db from '../db.json';

export default function Result() {
  const [storageResult, setStorageResult] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('results')) {
      setStorageResult(localStorage.getItem('results').split(','));
    }
    localStorage.removeItem('results');
  }, []);

  const end = Date.now() + (3 * 1000);
  function frame() {
    const colors = ['#bb0000', '#ffffff'];
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(frame);
    }
  }

  useEffect(() => {
    frame();
  }, []);

  return (
    <>
      <QuizBackground
        backgroundImage={db.bg}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img src={db.internetImg} alt="Internet Icon" className="internetIcon" />

        <QuizContainer
          style={{ float: 'none', margin: 'none' }}
        >
          <Widget style={{ height: '500px' }}>
            <Widget.Header>
              <h1>É isso ai, <strong>{router.query.name}</strong>!</h1>
            </Widget.Header>

            <Widget.Content>
              <p>Você acertou incríveis {storageResult.reduce((sum, current) => {
                const isCorrect = current === 'true';
                if (isCorrect) return sum + 1;
                return sum;
              }, 0)} pontos.
              </p>

              <h2>Respostas das questões</h2>
              <div>
                {storageResult.length === 0
                  ? <p>Opa, parece que você não respondeu nenhuma questão</p>
                  // eslint-disable-next-line max-len
                  : storageResult.map((result, index) => <p>Questão {index + 1}: {'  '} {db.questions[index].alternatives[db.questions[index].answer]}</p>)}
              </div>
            </Widget.Content>
          </Widget>
        </QuizContainer>

        <QuizContainer
          style={{
            position: 'absolute',
            right: '0',
          }}
        >
          <Widget
            as={motion.section}
            transition={{ delay: 3.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <div>
                <h3><a href="https://www.linkedin.com/in/jo%C3%A3o-maroeli-dos-santos-645314196/" target="_blank" rel="noreferrer"><i className="fab fa-github-square" /> Github</a></h3>
                <h3><a href="https://github.com/JohnMaroe" target="_blank" rel="noreferrer"><i className="fab fa-linkedin" /> LinkedIn</a></h3>
                <h3><a href="https://www.alura.com.br/" target="_blank" rel="noreferrer"><i className="fas fa-code" /> Alura</a></h3>
              </div>
              <p style={{ marginTop: '40px' }}>Made with love by John &#10084;</p>
            </Widget.Content>
          </Widget>
        </QuizContainer>

        <GitHubCorner projectUrl="/" goBack />

      </QuizBackground>
    </>
  );
}
