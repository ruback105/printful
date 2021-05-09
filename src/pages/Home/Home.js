import React, { useEffect, useState } from 'react'
import { Button } from '../../components'
import {
  setQuizIdAction,
  setUserAction,
} from '../../actions'
import { useDataLayerValue } from '../../DataLayer.js'
import { useHistory } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [{}, dispatch] = useDataLayerValue()

  const [quizes, setQuizes] = useState({})
  const [userState, setUserState] = useState(null)
  const [quizIdState, setQuizIdState] = useState(null)
  const [errors, setErrors] = useState({})

  const history = useHistory()

  useEffect(() => {
    fetch('https://printful.com/test-quiz.php?action=quizzes')
      .then((res) => res.json())
      .then(
        (res) => {
          setQuizes(res)
        },
        (error) => {
          console.error(error)
        },
      )
  }, [])

  const onSubmit = () => {
    setErrors({})

    userState
      ? setUserAction(userState, dispatch)
      : setErrors((prevErrors) => ({
          ...prevErrors,
          user: 'Please enter your name to continue',
        }))

    quizIdState && !isNaN(quizIdState)
      ? setQuizIdAction(quizIdState, dispatch)
      : setErrors((prevErrors) => ({
          ...prevErrors,
          quizId: 'Please select quiz to continue',
        }))

    if (quizIdState && userState) {
      history.push('/test')
    }
  }

  return (
    <section className="home">
      <div className="wrapper">
        <h1 className="title">Technical task</h1>
        <div className="form">
          <div className="field">
            {errors.user && <p className="error">{errors.user}</p>}
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={(event) => setUserState(event.target.value)}
            />
          </div>
          <div className="field">
            {errors.quizId && <p className="error">{errors.quizId}</p>}
            <select
              name="test"
              id=""
              onChange={(event) => setQuizIdState(event.target.value)}
            >
              <option value="default" defaultValue>
                Choose test
              </option>
              {Array.isArray(quizes) &&
                quizes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <Button className="btn filled" onClick={onSubmit}>
          Start
        </Button>
      </div>
    </section>
  )
}

export default Home
