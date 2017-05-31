import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2><a href="/">Robot directory</a></h2>
        </div>
        <section>{this.props.children}</section>
      </div>
    );
  }
}

export default App;
