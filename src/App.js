import logo from './logo.svg';
import './App.css';
import web3 from 'web3';
import lottery from './contracts/lottery';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="participate()">PARTICIPAR</a>
        <a href="chooseWinner()">PREMIO</a>

        
      </header>
    </div>
    
  );
  
}
//skaldk
async function  participate() {
  const accounts = await web3.eth.getAccounts();
  await lottery.methods.enter().send({
    from: accounts[1],
    value: 2000000000000000000
  });
}
async function chooseWinner() {
  const accounts = await web3.eth.getAccounts();
  await lottery.methods.choseWinner().send({
    from: accounts[0]
  });
}


export default App;
