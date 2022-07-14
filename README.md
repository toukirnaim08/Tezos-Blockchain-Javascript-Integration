## Tezos Smart Contracts
Tezos is a public, open-source blockchain protocol relying on a low power consumption and energy-efficient consensus.
The protocol also incorporates a self-amending governance system, which allows continuous improvements while preserving the integrity of this consensus. This is a rare feature that eliminates hard forks troubles.
Tezos is also fundamentally designed to provide code safety through Formal Verification.

A smart contract is composed of mostly three elements that are maintained by nodes in the state of the blockchain:

Their balance: a contract is a kind of account, and can receive and send Tez <br>
Their storage: data that is dedicated to and can be read and written by the contract <br>
Their code: it is composed of a set of entry-points, a kind of function that can be called either from outside of the chain, or from other contracts.<br>

Tezos smart contracts are written in Michelson, a low level stack language. you can use library to integrate Tezos with your application. In this 
project we have used a javascript library "Sotez" to perform basic tezos operations.

Sotez is an isomorphic JavaScript library that can be used seamslessly across both the server and client environments.
You can install Sotez using npm:
```
npm install sotez
```


# Tezos Javascript Integration

This is a node js application for handling tezos transactions <br/>
It has two api's, one for generating address and another for transfer operation.
It uses Sotez library to generate or re-generate address and transfer assets.


# Running Application locally

```
# step 1 clone the repo
cd Tezos-Javascript-Integration
# step 2 configure the .env file
ln -s .env.dev .env
# step 3 install dependencies
npm install
# step 4 run the dev server
npm start
```

# Running Tests

```
npm test
```

# Building Docker image
```bash
./build_docker_image.sh
```

# Swagger UI URL
```
/tezos-integration/apidocs
```
