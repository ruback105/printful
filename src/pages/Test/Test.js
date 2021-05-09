import React, { useEffect, useState } from 'react'
import { Button } from '../../components'
import { useDataLayerValue } from '../../DataLayer.js'
import ProgressBar from '@ramonak/react-progress-bar'
import { useHistory } from 'react-router-dom'
import { setAnswers } from '../../actions'
import './Test.css'

const Test = () => {
  const [{ answers, quizId }, dispatch] = useDataLayerValue()

  const [questionIndex, setQuestionIndex] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState({})
  const [questionAnswers, setQuestionAnswers] = useState(null)
  const [selectedAnswerId, setSelectedAnswerId] = useState(null)
  const [errors, setErrors] = useState({})

  const history = useHistory()

  useEffect(() => {
    setAnswers([], dispatch)

    fetch(`https://printful.com/test-quiz.php?action=questions&quizId=${quizId}`)
      .then((res) => res.json())
      .then(
        (res) => {
          setQuizQuestions(res)
        },
        (error) => {
          console.error(error)
        },
      )
  }, [])

  useEffect(async () => {
    quizQuestions[questionIndex] &&
      (await fetch(
        `https://printful.com/test-quiz.php?action=answers&quizId=${quizId}&questionId=${
          quizQuestions[questionIndex].id
        }}`,
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setQuestionAnswers(res)
          },
          (error) => {
            console.log(error)
          },
        ))
  }, [quizQuestions[questionIndex]])

  const selectAnswer = (id, event) => {
    setErrors({})

    document.querySelectorAll('.selected').length > 0 &&
      document
        .querySelectorAll('.selected')
        .forEach((elem) => elem.classList.remove('selected'))
    event.target.classList.add('selected')

    setSelectedAnswerId(id)
  }

  const nextQuestion = () => {
    console.log(document.querySelectorAll('.selected').length)
    if (document.querySelectorAll('.selected').length <= 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        answers: 'You must select answer in order to proceed further',
      }))
    } else {
      setAnswers([...answers, selectedAnswerId], dispatch)

      setQuestionIndex(questionIndex + 1)

      if (questionIndex + 1 === quizQuestions.length) {
        setTimeout(() => {
          history.push('/result')
        })
      }
    }
  }

  return (
    <section className="test">
      <div className="wrapper">
        <h1 className="title">
          {quizQuestions[questionIndex] && quizQuestions[questionIndex].title}
        </h1>
        <div className="form">
          {errors.answers && <p className="error">{errors.answers}</p>}
          <div className="options">
            {questionAnswers &&
              Object.entries(questionAnswers).map((value) => (
                <Button
                  className={'btn option'}
                  onClick={(event) => selectAnswer(value[1].id, event)}
                  key={value[1].id}
                >
                  {value[1].title}
                </Button>
              ))}
          </div>
        </div>

        <ProgressBar
          completed={100 * (questionIndex / quizQuestions.length)}
          className="progress-bar"
        />
        <Button className="btn filled" onClick={nextQuestion}>
          Next
        </Button>
      </div>
    </section>
  )
}

export default Test
