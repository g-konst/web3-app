import dotenv from 'dotenv';
import { type Contract, ContractAbi, Web3 } from 'web3';

import GreetArtifact from "./build/contracts/Greet.json";

dotenv.config();

const web3 = new Web3('ws://127.0.0.1:8545');
const GreetContract = new web3.eth.Contract(
    GreetArtifact.abi,
    GreetArtifact.networks[process.env.NETWORK_ID].address,
  );

GreetContract.events.allEvents().on('data', (event) => {
    console.log(`
  ${event.event} event received.
  Transaction Hash: ${event.transactionHash}
  Signature: ${event.signature}
`);
})

async function interact(contract: Contract<ContractAbi>) {
    const providersAccounts = await web3.eth.getAccounts();
    const defaultAccount = providersAccounts[0];

    try {
        const curGreet = await contract.methods.greet().call();
        console.log('Cur greet:', curGreet);
        console.log(await getGreetings(contract, "Konstantin"));

        await setGreet(contract, defaultAccount, "Hi");
        const newGreet = await contract.methods.greet().call();
        console.log('New greet:', newGreet);
        console.log(await getGreetings(contract, "Johnatan"));

        await setGreet(contract, defaultAccount, "Hello");
    } catch (error) {
        console.error(error);
    }
}

async function setGreet(contract, account, value) {
    const receipt = await contract.methods.setGreet(value).send({
        from: account,
        gas: '1000000',
        gasPrice: '10000000000',
    });
    console.log('setGreet transaction hash:', receipt.transactionHash);
}

async function getGreetings(contract, username) {
    return await contract.methods.greetings(username).call();
}

interact(GreetContract);
