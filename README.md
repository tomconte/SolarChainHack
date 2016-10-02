# //oneweek 2016 SolarChain

![SolarChain diagram](https://raw.githubusercontent.com/tomconte/tomconte.github.io/master/images/ApolloChain.png)

The SolarChain system consists of:

- An Ethereum Smart Contract that allows selling energy for coins ("ApolloCoins") and then reusing these coins later to buy additional energy from the grid when needed.
- A device process that measures excess energy produced in KW/h and automatically sells this energy via the contract.
- A user interface ("Wallet") that allows an end-user to track the energy he sold, and allows him to use some of his accumulated coins to buy additional energy.
- (TODO) A device process that can use available (purchased) energy to power a device.

## How to build

SolarChain used Truffle v2.0+, make sure you are using the right version.

Compile the Solidity contract:

```
truffle compile
```

Deploy it:

```
truffle deploy
```

Build the app:

```
truffle build
```

## How to run

Serve the app on `localhost`:

```
truffle serve
```

Run the device producer:

```
cd device-producer
npm install
truffle exec device-producer.js
```

## How to run tests

Install and run the Ethereum RPC client for testing and development:

```
npm install -g ethereumjs-testrpc
testrpc
```

The default testrpc port 8545 matches the configuation in file `truffle.js` so tests should run with:

```
truffle test
```
