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
    // IMPORTANT: Do NOT hardcode credentials in frontend code!
    // Instead, call a backend endpoint that securely stores and handles the authentication.
    // Example backend call (recommended):
    // axios.get('/api/petfinder-token')
    //   .then(response => {
    //     this.setState({ token: response.data.access_token })
    //   })
    
    // For now, if you still need to use client credentials:
    // 1. Create a backend proxy server (recommended for security)
    // 2. Never commit API keys to version control
    // 3. Use environment variables: process.env.REACT_APP_PETFINDER_CLIENT_ID
    
    // Placeholder - replace with secure backend call
    console.warn('Please implement secure authentication via a backend server');
    
    axios({
      method: 'post',
      url: 'https://api.petfinder.com/v2/oauth2/token',
      data: `grant_type=client_credentials&client_id=${process.env.REACT_APP_PETFINDER_CLIENT_ID}&client_secret=${process.env.REACT_APP_PETFINDER_CLIENT_SECRET}`
    })
      .then(response => {
        this.setState({ token: response.data.access_token })
      })
      .catch(error => {
        console.error('Authentication failed. Please set REACT_APP_PETFINDER_CLIENT_ID and REACT_APP_PETFINDER_CLIENT_SECRET environment variables.', error)
      })
  }
  render() {
    return (
      <Router basename='/'>
        <header>
          <div>
            <h1>Adopt-A-Pal</h1>
            <a href='https://www.petfinder.com/' target="_blank" rel="noopener noreferrer"><img src='https://www.underconsideration.com/brandnew/archives/petfinder_monogram.png' alt='Petfinder' /></a>
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
