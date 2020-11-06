const path = require('path');
const solc = require('solc');
const fs = require ('fs-extra'); //similar to fs module but it has a couple of extra functions (removeSync and ensureDirSync).

const buildPath = path.resolve(__dirname, 'src/contracts/build');
fs.removeSync(buildPath);

const memberPath = path.resolve(__dirname, './contracts', 'lottery.sol');
const source = fs.readFileSync(memberPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'lottery.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ "abi", "evm.bytecode"]
            }
        }
    }
}; 

const output = JSON.parse(solc.compile(JSON.stringify(input)), 1).contracts['lottery.sol'];

//create the build folder. First, check if it exists.
fs.ensureDirSync(buildPath);

for (let contract in output){
	fs.outputJsonSync(
		path.resolve(buildPath, contract + '.json'),
		output[contract]
	);
}
