import React, { Component } from 'react';
import Card from './components/Card';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row navbar">
          <h3>JavaScript Flashcards</h3>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link active" href="@" target="blank">Hard Data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="mailto:mike.stapleton2@gmail.com">Contact me</a>
            </li>
          </ul>
        </div>
        {<Card />}
        <div className="row justify-content-center mt-5">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-success">Easy</button>
            <button type="button" className="btn btn-warning">Medium</button>
            <button type="button" className="btn btn-danger">Hard</button>
          </div>
        </div>
        <div className="row">
          <button type="button" class="btn btn-success">Correct!</button>
          <button type="button" class="btn btn-danger">Keep in deck</button>
        </div>
      </div >
    );
  }
}

export default App;
