const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
//compiled version of the contract
const compiledLottery = require("../src/contracts/build/Lottery.json");

let accounts; //List of 10 accounts provided by Ganache.
let lottery; //Our contract: Counter

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    console.log("Available accounts: " + accounts);
    try {
        lottery = await new web3.eth.Contract(compiledLottery.abi)
            .deploy({
                data: "0x" + compiledLottery.evm.bytecode.object
            })
            .send({
                from: accounts[0],
                gas: "1000000"
            });


        lottery.setProvider(provider);
    } catch (err) {
        console.log("Catched exception: ", err);
        assert.ok(err);
    }
});
//Esta parte no funciona, la miro en otro momento
describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('buy ticket', async () => {
        await lottery.methods.enter().send({
            from: accounts[1]
        })
        await lottery.methods.enter().send({
            from: accounts[2]
        })
    });
        //Elegimos al ganador
    it('Choose winner', () => {
          await lottery.methods.choseWinner().send({
            from: accounts[0]
        }); 
     });
        

   

});

