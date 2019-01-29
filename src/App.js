import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import Nav from './components/Nav.js'
import Card from './components/Card';
import Inputbox from './components/Inputbox';
// import CardData from './CardData.json'
import Button from './components/Button.js';
import AddCard from './components/AddCard.js';
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
        inputValue: false
      })
    } else if (id === this.state.data.length) {
      console.log('else')
      this.setState({
        currentCard: this.state.data[0],
        id: 0
      })
    }
  }

  inputAnswer = () => {
    return this.state.currentCard.name === this.state.input ? this.setState({ inputValue: true }) : ''
  }

  updateInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  // generatePrev = (event) => {
  //   event.preventDefault()
  //   const id = this.state.id
  //   if (id <= this.state.data.length - 1) {
  //     this.setState({
  //       currentCard: this.state.data[id],
  //       id: this.state.id
  //     })
  //   } else {
  //     this.setState({
  //       cardExist: true,
  //       currentCard: this.state.data[id] - 1,
  //       id: this.state.id - 1
  //     })
  //   }
  // }


  render() {
    // console.log(this.state.data)
    return (
      <div className="container-fluid">
        {/* <Router>
          <div>
            <Route exact path="/" component={App.js} />
            // components that are dynamically rendered on the click.
            <Route path="/AddCard" component={AddCard} />
          </div>
        </Router> */}

        <Nav />
        <div className="body">
          {this.state.cardExist
            ? <Card
              currentCard={this.state.currentCard}
            />
            : ''}
          {<Button
            generateRandom={this.generateRandom}
            // generatePrev={this.generatePrev}
            generateNext={this.generateNext}
          />}
          {<Inputbox
            inputValue={this.state.inputValue}
            updateInput={this.updateInput}
            inputAnswer={this.inputAnswer}
          />}
          {/* <div className="row justify-content-center mb-5 mt-5">
            <button type="button" class="btn btn-success mb-5 mt-2 mr-5">Correct! Now remove</button>
            <button type="button" class="btn btn-danger mb-5 mt-2 ml-5">Wrong!Keep in deck</button>
          </div> */}
        </div>
      </div >
    );
  }
}

export default App;
