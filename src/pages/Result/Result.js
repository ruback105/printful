import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../../DataLayer.js'
import { setQuizIdAction } from '../../actions'
import './Result.css'

const Result = () => {
  const [{ user, quizId, answers }, dispatch] = useDataLayerValue()
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

  useEffect(() => {
    let answersUrl = ''
    answers.forEach((answer) => {
      answersUrl += `&answers[]=${answer}`
    })

    fetch(
      `https://printful.com/test-quiz.php?action=submit&quizId=${quizId}${answersUrl}`,
    )
      .then((res) => res.json())
      .then(
        (res) => {
          setCorrectAnswersCount(res.correct)
        },
        (error) => {
          console.error(error)
        },
      )

    setQuizIdAction(null, dispatch)
  }, [])

  return (
    <section className="test">
      <div className="wrapper">
        <h1 className="title">Thanks, {user}!</h1>
        <p>
          Your responded correctly to {correctAnswersCount} out of{' '}
          {answers.length} quesitons
        </p>
      </div>
    </section>
  )
}

export default Result
