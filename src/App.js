import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Home, Test, Result } from './pages/index'
import { useDataLayerValue } from './DataLayer'

function App() {
  const [{ user, quizId, answers }] = useDataLayerValue()

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          {user !== null && quizId !== null && (
            <Route path="/test" exact component={Test} />
          )}
          {answers && answers.length > 0 && (
            <Route path="/result" exact component={Result} />
          )}
        </Switch>
        <Redirect to="/" />
      </Router>
    </>
  )
}

export default App
