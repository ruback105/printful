export const setUserAction = (user, dispatch) => {
  dispatch({
    type: 'SET_USER',
    user: user,
  })
}

export const setQuizIdAction = (quizId, dispatch) => {
  dispatch({
    type: 'SET_QUIZ_ID',
    quizId: quizId,
  })
}

export const setQuizQuestionsAction = (quizQuestions, dispatch) => {
  dispatch({
    type: 'SET_QUIZ_QUESTIONS',
    quizQuestions: quizQuestions,
  })
}

export const setAnswers = (answers, dispatch) => {
  dispatch({
    type: 'SET_ANSWERS',
    answers: answers,
  })
}
