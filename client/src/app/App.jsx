/**
 * App.jsx
 *
 * App Component
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

// Initialization ==============================================================
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './nav/Navbar.jsx'

const Dashboard = () => (<div>DASHBOARD PAGE</div>);
const Projects = () => (<div>PROJECT PAGE</div>);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/dashboard" render={props => (
            <Dashboard {...props}/>)}
          />
          <Route exact path="/" render={props => (
            <Projects {...props}/>)}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
