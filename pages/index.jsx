import React, { useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';

import Layout from '../src/components/Layout';
// styles
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  function handleFormSubmit(e) {
    e.preventDefault();

    router.push(`/quiz?name=${name}`);
  }

  return (
    <>
      <Layout
        twitterHandle={db.twitterHandle}
        description={db.description}
        currentURL={db.currentURL}
        previewImage={db.bgShare}
        siteName={db.title}
        pageTitle={db.title}
      />

      <QuizBackground backgroundImage={db.bg}>
        <img src={db.internetImg} alt="Internet Icon" className="internetIcon" />
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>The Internet Quiz</h1>
            </Widget.Header>

            <Widget.Content>
              <p>lorem ipsum dolor sit amet...</p>

              <form onSubmit={(e) => handleFormSubmit(e)}>
                <input
                  type="text"
                  placeholder="Seu nome aqui"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <button type="submit" disabled={name.length === 0}>
                  {name.length === 0 ? 'Teste o que você sabe!' : `Teste o que você sabe, ${name}!`}
                </button>
              </form>

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

          <Footer />
        </QuizContainer>

        <GitHubCorner projectUrl="https://github.com/JohnMaroe/internet-quiz" />

      </QuizBackground>
    </>
  );
}
