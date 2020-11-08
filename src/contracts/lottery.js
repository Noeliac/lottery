import { getWeb3 } from "./web3";
import Lottery from "./build/Lottery.json";

let instance;
const web3 = getWeb3();
//We have to check if web3 has a value.
//If we don't check it we don't obtain any
//output in the Microsoft Edge Browser, for instance.
//The console displays an error message.
if (web3) {
  instance = new web3.eth.Contract(
    Lottery.abi,
    "0xFBB9f526170B8124C6aC8B043Fb82F5EE7d56b44"
  );
}

export default instance;
