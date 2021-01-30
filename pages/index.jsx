import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

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
import Link from '../src/components/Link';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  function handleFormSubmit(e) {
    e.preventDefault();

    router.push(`/quiz?name=${name}`);
  }

  useEffect(() => {
    localStorage.removeItem('results');
  }, []);

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
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          >
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
          <Widget
            as={motion.section}
            transition={{ delay: 0.3, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Header style={{ padding: '9px' }}>
              <h1>Quizes da galera</h1>
            </Widget.Header>

            <Widget.Content>

              <p>Não esqueça de colocar seu nome!</p>

              {db.external.map((link) => {
                const [projectName, githubUser] = link
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app/', '')
                  .split('.');

                return (
                  <OtherQuizes
                    as={Link}
                    href={`/quiz/${projectName}___${githubUser}`}
                    key={link}
                    onClick={(e) => {
                      if (name.length === 0) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {`${githubUser}: ${projectName}`}
                  </OtherQuizes>
                );
              })}

            </Widget.Content>
          </Widget>

          <Footer
            as={motion.footer}
            transition={{ delay: 0.4, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          />
        </QuizContainer>

        <GitHubCorner projectUrl="https://github.com/JohnMaroe/internet-quiz" />

      </QuizBackground>
    </>
  );
}
