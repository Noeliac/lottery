import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import lottery from './contracts/lottery';
import Web3 from "web3";
//const web3 = new Web3(window.web3.currentProvider.eth_requestAccounts);
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:3000');


class App extends Component {

  state = {
    value: '', 
    message:''
  };
   render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h4>PARTICIPA EN LA LOTERÍA</h4>  
        </header>
      
        <form onSubmit={this.participate}>
          <div>
            <label>Escribe la cantidad de ether que quieres apostar </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
        <button>Enter</button>
        </form>
        <h1>{this.state.message}</h1>

        <div className='d'><label>Descubre quién es el ganador:</label></div>
          <button onClick={this.chooseWinner}>PREMIO</button>
      </div>
    
    );
   
  }
  
  participate = async() => {

    const accounts = await web3.eth.getAccounts();
   
    await lottery.methods.enter().send({
      from:  accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered!'})
  };
  chooseWinner = async() =>{
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.choseWinner().send({
      from: accounts[0],
      value: web3.utils.toWei("1", 'ether')
    }); 

    this.setState({ message: 'winner' })
  };

}
export default App;