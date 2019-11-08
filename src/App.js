import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import RandomAnimal from './RandomAnimal';
import OrgFinder from './OrgFinder';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      token: ''
    }
  }
  componentDidMount() {
    this.authentication()
  }
  authentication() {
    axios({
      method: 'post',
      url: 'https://api.petfinder.com/v2/oauth2/token',
      data: "grant_type=client_credentials&client_id=lWSjPsZx1WhEQdoWOU9N2luD4gfXlBjySDbKD9qEK3cyjoJfAP&client_secret=TvYHcRREzNh60sZCpcpl2f0HsKgAJ59kUivd1KIt"
    })
      .then(response => {
        this.setState({ token: response.data.access_token })
      })
  }
  render() {
    return (
      <Router basename='/'>
        <header>
          <div>
            <h1>Adopt-A-Pal</h1>
            <a href='https://www.petfinder.com/' target="_blank" rel="noopener noreferrer"><img src='https://www.underconsideration.com/brandnew/archives/petfinder_monogram.png' alt='' /></a>
          </div>
          <nav>
            <Link to="/">Home</Link>{' '}
            <Link to="/randomanimal">Random Pet</Link>{' '}
            <Link to="/orgfinder">Organizations</Link>
          </nav>
        </header>
        <div className="App">
          {(this.state.token) ?
            (<div>
              <Route exact path="/" component={Home} />
              <Route path="/randomanimal" render={(props) => <RandomAnimal {...props} token={this.state.token} />} />
              <Route path="/orgfinder" render={(props) => <OrgFinder {...props} token={this.state.token} />} />
            </div>)
            :
            <Route exact path="/" component={Home} />}
        </div>
      </Router>
    )
  }
}

export default App;
