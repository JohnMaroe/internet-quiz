import QuizBackground from '../src/components/QuizBackground'
import GitHubCorner from '../src/components/GitHubCorner'
import Widget from '../src/components/Widget'
import QuizContainer from '../src/components/QuizContainer'

import db from '../db.json';

export default function Quiz() {
    return (
      <QuizBackground backgroundImage={db.bg}>
        <img src={db.internetImg} alt="Internet Icon" className="internetIcon" />
        <QuizContainer>
          <Widget>
              <Widget.Header>
                  O Quiz
              </Widget.Header>
              <Widget.Content>
                  <p>Error 404, conteúdo não encontrado. Volte mais tarde?</p>
                  <a style={{ textDecoration: 'none' }} href="/">Voltar pra Home</a>
              </Widget.Content>
          </Widget>
        </QuizContainer>
        <GitHubCorner />
      </QuizBackground>
    )
}