const assert = require('assert');
const ganache = require('ganache-cli');

const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
beforeEach(async () => {
	// Get list of all accounts
	accounts = await web3.eth.getAccounts();

	// use one of the accounts to deploy contracts
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!'] })
		.send({ from: accounts[0], gas:'1000000' })
})

describe('Inbox', () => {
	it('deploys a contract', () => {
		assert.ok(inbox.options.address)
	});

	it('has a default message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, "Hi there!");
		// .message().call()
		// ===> basically means that .message() passes arguments
		// and initializes then .call() actually calls the function
	})

	it('can set message', async ()=>{
		await inbox.methods.setMessage("Ledum")
			.send({ from: accounts[0] });
		const getNewMessage = await inbox.methods.message()
			.call();
		assert(getNewMessage, "Ledum");
	})
})

// 0xD5472F1d570E1FCc86fa92315858B9026cb65f32
