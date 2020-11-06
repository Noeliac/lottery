import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import lottery from './contracts/lottery';
//import web3 from '../node_modules/web3';


class App extends Component {
   render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        
          <button onClick={this.participate}>PARTICIPAR</button>
          <button onClick={this.chooseWinner}>PREMIO</button>
        </header>
      </div>
    
    );
   
  }
  
  participate = async() =>{
    const ganache = require("ganache-cli");
    const Web3 = require("web3");
    const provider = ganache.provider();
    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    
    await lottery.methods.enter().send({
      from:  accounts[0],
      value: 2000000000000000000
    });
  };
  chooseWinner = async() =>{
    
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.choseWinner().send({
      from: accounts[0]
    });
  };

}
export default App;
