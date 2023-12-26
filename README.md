# NttId

NttId is a Solidity smart contract that is based on the ERC-4671 standard with additional functionality for issueing, blacklisting, revoking tokens, and more. It can be used to manage tokenized assets, such as access tokens, digital collectibles, and digital identity.

### Features

- Issuance: Allows authorized users to mint new tokens.
- Blacklisting: Enables administratos to freeze specific tokens.
- Revocation: Provides a mechanism to permanently disable specific token.
- Querying: Allows users to get the total number of NttId owned by a user, the total number of NttId issued, and the total number of NttId in circulation.

### Prerequisites

- Node.js (version 14 or later)
- npm

### Installation

1. Clone the repository:

```
git clone https://github.com/waddaboo/solidity-nttId.git
```

2. Install the dependencies:

```
npm install
```

### Tests

You can run the test suite by using the following command:

```
npx hardhat test
```

### Compiling

To compile the contract to a local Hardhat network, run the following command:

```
npx hardhat compile
```

#### Disclaimer

This smart contract is provided for informational purposes only and should not be considered financial advice. Please use it with caution and at your own risk. It is recommended to thoroughly test and audit the code before deploying it to a live network.
