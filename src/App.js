import React, { Component } from 'react';
import 'bootstrap-css-only';
import './App.css';
import {BrowserRouter as Router,  Route} from 'react-router-dom'
import HomeSearch from './components/HomeSearch'
import ResultWheather from './components/ResultWheather'


class App extends Component {
  render() {
    return (

      <Router>
          <div className="App">
            <Route exact path="/" component={HomeSearch} /> 
            <Route exact path="/result/:city" component={ResultWheather}/>
          </div>
      </Router>
    );
  }
}

export default App;
