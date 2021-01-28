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
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import OtherQuizes from '../src/components/OtherQuizes/index';

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
              <p style={{ textDecoration: 'underline' }}>Bora começar?</p>
              <p style={{ marginBottom: '24px' }}>Coloque seu nome aqui pra saber sua score depois.</p>

              <form onSubmit={(e) => handleFormSubmit(e)}>
                <Input
                  placeholder="Seu nome aqui"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Button type="submit" disabled={name.length === 0}>
                  {name.length === 0 ? 'Teste o que você sabe!' : `Teste o que você sabe, ${name}!`}
                </Button>
              </form>

            </Widget.Content>
          </Widget>
          <Widget>
            <Widget.Header>
              <h1>Quizes da galera</h1>
            </Widget.Header>

            <Widget.Content>
              <OtherQuizes as="a" href={db.external[0]}>1</OtherQuizes>
              <OtherQuizes as="a" href={db.external[1]}>2</OtherQuizes>
              <OtherQuizes as="a" href={db.external[2]}>3</OtherQuizes>
            </Widget.Content>
          </Widget>

          <Footer />
        </QuizContainer>

        <GitHubCorner projectUrl="https://github.com/JohnMaroe/internet-quiz" />

      </QuizBackground>
    </>
  );
}
