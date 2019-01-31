import React, { Component } from 'react';
// import AppRouter from "./components/AppRouter.js";
import Nav from './components/Nav.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home.js';
import AddCard from './components/AddCard.js';
import Body from './components/Body.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      cardExist: false,
      currentCard: '',
      input: '',
      inputValue: false,
      id: 0,
    }
  }

  componentDidMount() {
    fetch("http://localhost:3001/")
      .then(data => data.json())
      .then(JSONdata => {
        this.setState({
          data: JSONdata
        })
      })
  }

  getRandomCard(max) {
    return Math.floor(Math.random() * (max + 1));
  }

  generateRandom = () => {
    const randomIndex = this.getRandomCard(this.state.data.length - 1)
    const randomCard = this.state.data[randomIndex]
    this.setState({
      cardExist: true,
      currentCard: randomCard,
      inputValue: false,
    })
  }

  generateNext = (event) => {
    event.preventDefault()
    const id = this.state.id
    if (id < this.state.data.length) {
      this.setState({
        cardExist: true,
        currentCard: this.state.data[id],
        id: this.state.id + 1,
        inputValue: false,
        input: '',
      })
    } else if (id === this.state.data.length) {
      console.log('else')
      this.setState({
        currentCard: this.state.data[0],
        id: 1,
        inputValue: false
      })
    }
  }

  inputAnswer = () => {
    return this.state.currentCard.name === this.state.input ? this.setState({ inputValue: true }) : ''
  }
  // ON TRUE event.target.value = '' in a few if statements
  // ON FALSE event.target.value = this.state.input

  updateInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }



  render() {
    console.log("looping")

    return (
      <Router>
        <div className="container-fluid">

          <Nav
          />
          <Route path="/home" render={() => <Home />} />
          <Route path="/addcard" render={() => <AddCard />} />
          <Route path="/study" render={() => <Body
            currentCard={this.state.currentCard}
            cardExist={this.state.cardExist}
            generateRandom={this.generateRandom}
            generateNext={this.generateNext}
            inputValue={this.state.inputValue}
            updateInput={this.updateInput}
            inputAnswer={this.inputAnswer}
          />} />
        </div>
      </Router>
    );
  }
}

export default App;
