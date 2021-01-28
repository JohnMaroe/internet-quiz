import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import confetti from 'canvas-confetti';

// Components
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';

import db from '../db.json';

export default function Result() {
  const router = useRouter();

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
      <QuizBackground backgroundImage={db.bg}>
        <img src={db.internetImg} alt="Internet Icon" className="internetIcon" />

        <QuizContainer>
          <Widget>
            <Widget.Header>
              <h1>É isso ai {router.query.name}!</h1>
            </Widget.Header>

            <Widget.Content>
              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Header>
              <h1>Quiz da galera</h1>
            </Widget.Header>

            <Widget.Content>
              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>

        </QuizContainer>

        <GitHubCorner projectUrl="/" goBack />

      </QuizBackground>
    </>
  );
}
