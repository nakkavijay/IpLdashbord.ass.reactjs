import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'

import TeamMatches from './components/TeamMatches'

import './App.css'

import NotFound from './components/NotFound'

const App = () => (
  <div className="app-container">
    <switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/team-matches/:id" component={TeamMatches} />
      <Route component={NotFound} />
    </switch>
  </div>
)

export default App
