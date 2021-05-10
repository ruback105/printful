export const initialState = {
  user: null,
  quizId: null,
  quizQuestions: {},
  answers: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        user: action.user,
      }
    }
    case 'SET_QUIZ_ID': {
      return {
        ...state,
        quizId: action.quizId,
      }
    }
    case 'SET_QUIZ_QUESTIONS': {
      return {
        ...state,
        quizQuestions: action.quizQuestions,
      }
    }
    case 'SET_ANSWERS': {
      return {
        ...state,
        answers: action.answers,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
