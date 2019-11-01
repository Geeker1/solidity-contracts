const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, 'utf8');
const compiledSource = solc.compile(source, 1)

module.exports = compiledSource.contracts[":Inbox"];

