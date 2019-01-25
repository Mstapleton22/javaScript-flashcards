import React, { Component } from 'react';
import Nav from './components/Nav.js'
import Card from './components/Card';
import Inputbox from './components/Inputbox';
import CardData from './CardData.json'
import Button from './components/Button.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: CardData.methods,
      cardExist: false,
      currentCard: '',
      input: '',
      inputValue: false,
      id: 0,

    }
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
    })
  }

  generateNext = (event) => {
    event.preventDefault()
    const id = this.state.id
    if (id >= this.state.data.length - 1) {
      this.setState({
        currentCard: this.state.data[id],
        id: 0
      })
    } else {
      this.setState({
        cardExist: true,
        currentCard: this.state.data[id],
        id: this.state.id + 1
      })
    }
  }

  inputAnswer = () => {
    console.log('called')
    if (this.state.currentCard.name === this.state.input) {
      this.setState({
        inputValue: true
      })
    }
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
    console.log('cardexists')
    return (
      <div className="container-fluid">
        <Nav />
        <div className="body">
          {this.state.cardExist
            ? <Card
              currentCard={this.state.currentCard}
            />
            : ''}
          {/* <h6 className="row header justify-content-center mt-5">Click "Easy" "Medium" "Hard" to display a new card in that category</h6> */}
          {<Button
            generateRandom={this.generateRandom}
            // generatePrev={this.generatePrev}
            generateNext={this.generateNext}
          />}
          {<Inputbox
            updateInput={this.updateInput}
            inputAnswer={this.inputAnswer}
          />}
          <div className="row justify-content-center mb-5 mt-5">
            <button type="button" class="btn btn-success mb-5 mt-2 mr-5">Correct! Now remove</button>
            <button type="button" class="btn btn-danger mb-5 mt-2 ml-5">Wrong!Keep in deck</button>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
