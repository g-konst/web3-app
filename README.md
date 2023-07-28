## web3-app
This is the web3 application, with custom contract and tests.

### Getting Started

This project uses the [`truffle`](https://trufflesuite.com/docs/truffle/how-to/install/) package, which only works on nodejs <= 18, so the first thing you need to do is install [`nvm`](https://github.com/nvm-sh/nvm/blob/master/README.md) and prepare your environment.

#### Installiation

After `nvm` installation, you need to install project dependencies:

```bash
$ npm i
```

After installation all of dependencies you need to start a `ganache` server to create a test Ethereum network, and you will see connection address (update that address in `truffle-config.js` file if needed):

```bash
$ ganache
...
RPC Listening on 127.0.0.1:8545
```

Next you need to compile the contracts and make migrations

```bash
$ npm run migrate
```

After building the artifacts, you need to create a `.env` file and specify your network ID here (you can find it in the `build/contracts/<contractName>.json` file), like this:

```bash
$ cat build/contracts/Greet.json | grep -P "networks" -A 1
  "networks": {
    "1690556437950": {

$ cat .env
NETWORK_ID=1690556437950
```

Now you can start the app:

```bash
$ npm run start
```

### Testing
To run the tests run the following command:

```bash
$ npm run tests
```
