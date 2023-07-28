import dotenv from 'dotenv';
import { type Contract, ContractAbi, Web3 } from 'web3';

import GreetArtifact from "./build/contracts/Greet.json";

dotenv.config();

const web3 = new Web3('ws://127.0.0.1:8545'); //Replace with your RPC
const GreetContract = new web3.eth.Contract(
    GreetArtifact.abi,
    GreetArtifact.networks[process.env.NETWORK_ID].address,
);

async function watch(contract: Contract<ContractAbi>, events: string) {
    contract.events[events]().on('data', (event) => {
        console.log(`
      ${event.event} event received.
      Transaction Hash: ${event.transactionHash}
      Signature: ${event.signature}
    `);
    })
}

async function interact(contract: Contract<ContractAbi>) {
    const providersAccounts = await web3.eth.getAccounts();
    const defaultAccount = providersAccounts[0];

    const curGreet = await contract.methods.greet().call();
    console.log('Cur greet:', curGreet);
    console.log(await getGreetings(contract, "Konstantin"));

    await setGreet(contract, defaultAccount, "Hi");
    const newGreet = await contract.methods.greet().call();
    console.log('New greet:', newGreet);
    console.log(await getGreetings(contract, "Johnatan"));

    await setGreet(contract, defaultAccount, "Hello"); // reset the value
}


async function setGreet(contract, account: string, value: string) {
    const receipt = await contract.methods.setGreet(value).send({
        from: account,
        gas: '100000',
        gasPrice: '10000000000',
    });
    console.log('setGreet transaction hash:', receipt.transactionHash);
}


async function getGreetings(contract, username: string) {
    return await contract.methods.greetings(username).call();
}

async function errorHandler(runner: string, reason: Error) {
    let msg: string = '';
    switch (reason.name) {
        case 'AbiError':
            msg = `Check please that your contract exists in the ${process.env.NETWORK_ID} network.`;
            break;

        default:
            msg = `Something went wrong: ${reason}`;
            break;
    }
    console.log(`[${runner}] ${msg}`);
}

watch(GreetContract, 'allEvents').catch(
    (reason) => errorHandler('watch', reason)
);
interact(GreetContract).catch(
    (reason) => errorHandler('interact', reason)
);
