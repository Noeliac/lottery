import Web3 from "web3";

let web3;

export function getWeb3() {
  //We obtain an instance of the web3:
  if (!web3) {
    web3 = new Web3(Web3.givenProvider);
  }
  return web3;
}
