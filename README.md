# bionic event Dapp

event ticket buying &amp; selling DApp built for ethereum using solidity as backend and angular 7 for user interface. the app has features that let users perform event related tasks such as.

1. event organizers can create events.
2. organizers can sell ticket and accept payments using ethereum.
3. allow event organizers to validate users tickets.
4. event attendess can purchase ticket to there favorite event.
5. allow ticket to transfer to other users with ethereum account.
6. organizers can cancel events they have created.
7. search for events available.

## Development Tools.

the project is developed using different technologies.

- node.js
- angular 7.
- solidity 5
- truffle

## Enviroment setup

1. UI enviroment requirement.
   to start using the app first you have to install ** node 8 <= ** for further installation guid visit [nodejs](https://www.nodejs.org/en/download).
   after installing node in your enviroment install ** angular cli ** using npm or yarn what ever you prefer. i have used npm while developing the project.
   install angular cli by runing the code below.
   `npm install -g @angular/cli`

for more information on how to setup angular visit [Angular](https://angular.io/guide/setup-local).
finally we need ethereum client to connect to the ethereum network, for that install google crome ** metamask ** extention go to the following link to install metamask extention
[metamask](https://metamask.io/)
after completeing the above the enviroment requirment for the user interface has been met. next is setting up the enviroment for the backend/api.

2. Backen / API requirement.
   in order to use the backend there are few applications that need to be installing.
   for local ethereum network simulation the app uses ** ganache ** follow the following link to install ganache on your workspace [ganache](https://www.trufflesuite.com/ganache).
   the next step is to install truffle framework used for writing smart contract.
   execute the following line of code to install truffle on your global enviroment.
   `npm install -g truffle`
   for more information on how to setup truffle visit [truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation).
   finally we need to install ** solidity compiler v5<= ** run the following code to install solidity
   `npm install -g solc`
   for more information follow [solidity](https://www.trufflesuite.com/docs/truffle/getting-started/installation) to install solidity compiler on your workspace.

after successfuly completing the steps described above you are ready to start running the application.

## Running application

in order to deploy our contracts to ethereum network for simulation we have to have a running ethereum serve for that we are going to use ganache-cli.
open terminal window and run `ganache-cli` to start the server. when running the above code a local ethereum instance will be created with default 10 accounts that are prefunded with ether. now connect to ganache server with metamask by copying the ** mnemonic ** field and using that as a seed phrase for metamask.
open metamask and select the option ** import using seed phrase ** this will open a browser window that will prompt you to enter the seed phrase now past the seed phrase in the approprate field and create password for your network and submit the form. you have now successfuly connected ganache server with your browser.

next on the root directory of the project run
`truffle compile` to compile the contracts. hoping the contracts compiled with no error run `truffle migrate` to migrate the project on the network.

next enter in the frontend directory and run
`npm install` to install all the dependencies required for the UI. once every dependency is installed for the project go ahead and run `ng serve -o` to compile and serve the application on the browser.

congragulations now you can use the application.

### Testing contract

on the root directory of the project run
`truffle test` all of the available tests should execute.
