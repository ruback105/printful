import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Test, Result } from './pages/index'
import { useDataLayerValue } from './DataLayer'

function App() {
  const [{ user, quizId }, dispatch] = useDataLayerValue()

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          {console.log()}
          {user !== null && quizId !== null && (
            <Route path="/test" exact component={Test} />
          )}
          {user !== null && quizId !== null && (
            <Route path="/result" exact component={Result} />
          )}
        </Switch>
      </Router>
    </>
  )
}

export default App
