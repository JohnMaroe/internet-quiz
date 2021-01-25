import styled from 'styled-components';
import db from '../db.json';

import Layout from '../src/components/Layout';
// styles
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 80px;
  margin: auto 10%;
  float: right;

  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
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
              <h1>The legend of zelda</h1>
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

          <Footer />
        </QuizContainer>
        
        <GitHubCorner projectUrl="https://github.com/JohnMaroe/internet-quiz" />

      </QuizBackground>
    </>
  );
}
