import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalState } from "../GlobalStateContext"

const questions = [
  {
    id: 1,
    question: "What's your hair type or texture?",
    answers: ['Straight', 'Curly', 'Wavy', 'Fine']
  },
  {
    id: 2,
    question: 'How often do you wash your hair?',
    answers: ['Daily', 'Every other day', 'Twice a week', 'Once a week', 'Once every two weeks']
  },
  {
    id: 3,
    question: "What benefit do you look for in your hair products?",
    answers: ['Anti-breakage', 'Hydration', 'Soothing dry scalp', 'Repairs the appearance of damaged hair', 'Volume', 'Curl and coil enhancing.']
  },
  {
    id: 4,
    question: 'Is there anything troubling you about your hair?',
    answers: ['Breakage', 'Frizz', 'Scalp dryness', 'Damage', 'Tangling']
  },
  {
    id: 5,
    question: 'What is your natural hair color(s) today?',
    answers: ['Black', 'Brown', 'Blonde', 'Red/Orange0', 'Silver/Grey']
  }
]

export const QuestionPage = () => {
  const navigate = useNavigate()
  const [questionNumber, setQuestionNumber] = useState(0)
  const { globalState, setGlobalState } = useGlobalState();

  const updateState = (e) => {
    setGlobalState(prevState => (
      [...prevState, e.target.innerHTML]
    ));
    
    const chosenAnswer = document.querySelector(`[data-answer="${e.target.innerHTML}"]`);
    if (chosenAnswer) {
      chosenAnswer.classList.add('btn__answer-active');
    }
  };

  const nextQuestion = () => {
    document.querySelector('.btn__answer-active').classList.remove('btn__answer-active')

    if(questionNumber <= 3){
      setQuestionNumber(prevNum => prevNum + 1)
    } else {
      navigate('/ResultsPage', {replace: true})
    }
  }

  const prevQuestion = () => {
    if(questionNumber <= 4 && questionNumber > 0) {
      setQuestionNumber(prevNum => prevNum - 1)
    } else {
      navigate('/', {replace: true})
    }
  }
  return (
    <div className="wrapper__question">
      <div className="question">
        <h3>{questions[questionNumber].question}</h3>
        <ul>
          {
            questions[questionNumber].answers.map((answer, index) => {
              return (<li className={`btn btn__answer`} data-answer={answer} onClick={updateState} key={index}>{answer}</li>)
            })  
          }
        </ul>
        <button className="btn__back" onClick={prevQuestion}>Back</button>
        <button className="btn" onClick={nextQuestion}>Next &rarr;</button>
      </div>
      <div className="progressBar">
        <div className="progress-bar" style={{background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
  conic-gradient(#AADDF3 ${questions[questionNumber].id*20}%, #EEF7FB 0)`}}>{questions[questionNumber].id}/{questions.length}</div>
      </div>
    </div>  
  )
}
