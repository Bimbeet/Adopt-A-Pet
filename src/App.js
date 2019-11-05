import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import RandomAnimal from './RandomAnimal'

function App() {
  return (
    <Router>
      <header>
        <div></div>
        <div></div>
      </header>
      <nav>
        <Link to="/">Home</Link>{' '}
        <Link to="/randomanimal">Find Animal</Link>
      </nav>
      <div className="App">
        <Route exact path="/"/>
        <Route path="/randomanimal" component={RandomAnimal} />
      </div>
    </Router>
  );
}

export default App;
