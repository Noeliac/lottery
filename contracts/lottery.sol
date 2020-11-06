// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.4;

contract Lottery {
    address public manager;
    address payable[] public  players;
    uint public totalamount;
    uint public numrandom;
    
    constructor () {
        manager = msg.sender;
        totalamount = 0;
    }

    modifier onlyOwner() {
        require(manager == msg.sender);
        _;
    }
    
    modifier isWinner() {
        require(players[numrandom] == msg.sender);
        _;
    }
    
    function enter() public payable {
        require (msg.value > .01 ether);
        players.push(msg.sender);
        totalamount += msg.value;
    }
    
    function choseWinner() public onlyOwner payable{
         numrandom = uint(block.number * block.timestamp)%(players.length + 1);
         players[numrandom].transfer(totalamount);
    }
}
