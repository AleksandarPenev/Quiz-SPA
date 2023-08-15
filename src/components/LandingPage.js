import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const navigate = useNavigate()
    
  return (
    <div className="wrapper">
        <div className="landingPage__content">
            <h1>Build a self care routine suitable for you</h1>
            <p>Take out test to get a personalised self care routine based on your needs.</p>
            <button className="btn" onClick={() => {navigate('/QuestionPage', {replace: true})}}>Start the quiz</button>
        </div>
    </div>
  )
}

export default LandingPage
