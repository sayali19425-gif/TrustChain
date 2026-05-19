<div align="center">

<img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" />
<img src="https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/ethers.js-2535A0?style=for-the-badge&logo=ethereum&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />

<br /><br />

# ⛓ Blockchain-Based Freelance Escrow System

### Trustless Payments Between Clients and Freelancers Using Ethereum Smart Contracts

*No middleman. No fraud. No delays. Just code.*

<br />

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Network](https://img.shields.io/badge/Network-Sepolia%20Testnet-orange)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen)

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Problem Statement](#-problem-statement)
- [How It Works](#-how-it-works)
- [Smart Contract Functions](#-smart-contract-functions)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Smart Contract Deployment](#-smart-contract-deployment)
- [Environment Variables](#-environment-variables)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Author](#-author)
- [License](#-license)

---

## 📖 About the Project

The **Blockchain-Based Freelance Escrow System** is a decentralized web application built on the **Ethereum blockchain** that solves the trust problem between clients and freelancers.

When a client hires a freelancer, there is always a risk — the client might not pay after receiving the work, or the freelancer might disappear with an advance payment. This system eliminates that risk completely by using a **Solidity smart contract** as an automatic, impartial escrow agent.

- Client deposits ETH → funds are **locked in the smart contract**
- Freelancer completes the work → client **reviews and approves**
- Smart contract **automatically releases payment** to freelancer
- If unsatisfied → client calls **refund** and gets ETH back

Everything is on-chain, transparent, and verifiable on **Etherscan** — no middleman, no commission fees, no delays.

---

## ❗ Problem Statement

| Problem | Description |
|---|---|
| 💸 Payment Fraud | Clients refuse to pay after receiving completed work |
| 🏃 Advance Scams | Freelancers disappear after taking advance payment |
| 💰 High Fees | Traditional escrow platforms charge 5–20% commission |
| ⚖️ Biased Disputes | Centralized platforms resolve disputes slowly and unfairly |
| 🔒 No Transparency | No tamper-proof record of the payment agreement exists |
| 🌍 Cross-Border Issues | Banking restrictions delay international freelance payments |

---

## ⚙️ How It Works

```
Client                    Smart Contract              Freelancer
  │                            │                          │
  │── Deploy Contract ────────▶│                          │
  │── Deposit ETH ────────────▶│ (Funds Locked 🔒)        │
  │                            │◀─── Verify Balance ──────│
  │                            │                          │
  │                            │         Work in Progress │
  │                            │                          │
  │◀──── Submit Work ──────────┤──────────────────────────│
  │                            │                          │
  │── approveWork() ──────────▶│                          │
  │                            │── Transfer ETH ─────────▶│
  │                            │   (Auto Released ✅)      │
```

**Step-by-step:**

1. 🦊 Client connects **MetaMask** wallet to the React app
2. 📝 Client fills project form — freelancer address, ETH amount, deadline
3. 🚀 Client deploys **FreelanceEscrow** smart contract — ETH locked on-chain
4. 📡 `FundsDeposited` event emitted and recorded on Etherscan
5. 🔍 Freelancer verifies locked funds using `getBalance()`
6. 💻 Freelancer completes project and submits deliverables
7. ✅ Client approves → `approveWork()` → ETH sent **instantly** to freelancer
8. ↩️ Client unsatisfied → `refundClient()` → ETH returned to client

---

## 📜 Smart Contract Functions

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelanceEscrow {

    address payable public client;
    address payable public freelancer;
    uint256 public amount;
    bool public isComplete;

    modifier onlyClient() {
        require(msg.sender == client, "Not client");
        _;
    }

    event FundsDeposited(uint256 amount);
    event PaymentReleased(address to, uint256 amt);
    event FundsRefunded(address to, uint256 amt);

    constructor(address payable _freelancer) payable {
        client = payable(msg.sender);
        freelancer = _freelancer;
        amount = msg.value;
        emit FundsDeposited(msg.value);
    }

    function approveWork() external onlyClient {
        require(!isComplete, "Already complete");
        isComplete = true;
        freelancer.transfer(amount);
        emit PaymentReleased(freelancer, amount);
    }

    function refundClient() external onlyClient {
        require(!isComplete, "Already complete");
        client.transfer(amount);
        emit FundsRefunded(client, amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
```

| Function | Access | Description |
|---|---|---|
| `constructor()` | Anyone (deploy) | Deploys contract, sets client & freelancer, locks ETH |
| `approveWork()` | Client only | Marks complete, releases ETH to freelancer |
| `refundClient()` | Client only | Returns ETH to client if work not approved |
| `getBalance()` | Public view | Returns current ETH locked in contract |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Smart Contract** | Solidity ^0.8.0 |
| **Blockchain** | Ethereum (Sepolia Testnet) |
| **Deployment** | Hardhat / Remix IDE |
| **Frontend** | React JS |
| **Blockchain Library** | ethers.js v6 |
| **Wallet** | MetaMask |
| **Backend** | Node.js + Express.js *(optional)* |
| **Database** | MongoDB + Mongoose *(optional)* |
| **Version Control** | Git & GitHub |

---

## 📁 Project Structure

```
blockchain-escrow/
│
├── contracts/
│   └── FreelanceEscrow.sol          # Main Solidity smart contract
│
├── scripts/
│   └── deploy.js                    # Hardhat deployment script
│
├── test/
│   └── FreelanceEscrow.test.js      # Contract unit tests
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Dashboard.jsx        # Escrow dashboard
│       │   ├── CreateEscrow.jsx     # New escrow form
│       │   ├── EscrowDetail.jsx     # Escrow detail & actions
│       │   └── ConnectWallet.jsx    # MetaMask connection
│       ├── utils/
│       │   └── contract.js          # ethers.js contract helper
│       ├── App.jsx
│       └── index.js
│
├── backend/                         # Optional Node.js backend
│   ├── models/
│   │   └── Project.js               # MongoDB schema
│   ├── routes/
│   │   └── projects.js              # REST API routes
│   └── server.js
│
├── hardhat.config.js
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [MetaMask](https://metamask.io/) browser extension
- [Git](https://git-scm.com/)
- Sepolia testnet ETH — get free ETH from [Sepolia Faucet](https://sepoliafaucet.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blockchain-escrow.git
cd blockchain-escrow
```

### 2. Install Dependencies

```bash
# Install root dependencies (Hardhat)
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies (optional)
cd backend
npm install
cd ..
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Fill in your values in `.env` (see [Environment Variables](#-environment-variables) section below).

### 4. Compile the Smart Contract

```bash
npx hardhat compile
```

### 5. Run the Frontend

```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

### 6. Connect MetaMask

1. Open MetaMask → Switch network to **Sepolia Testnet**
2. Click **Connect Wallet** in the app
3. Approve the connection

---

## 🔐 Smart Contract Deployment

### Deploy to Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Example output:**
```
Deploying FreelanceEscrow...
Contract deployed at: 0x1234...abcd
Transaction hash: 0xabcd...1234
```

Copy the deployed contract address and paste it into your `.env` file.

### Deploy using Remix IDE

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Paste the `FreelanceEscrow.sol` code
3. Compile with Solidity ^0.8.0
4. Select **Injected Web3** as environment (connects MetaMask)
5. Deploy with ETH value and freelancer address as constructor argument

### Run Tests

```bash
npx hardhat test
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Hardhat / Deployment
PRIVATE_KEY=your_metamask_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_infura_project_id
ETHERSCAN_API_KEY=your_etherscan_api_key

# Frontend
REACT_APP_CONTRACT_ADDRESS=0x_deployed_contract_address
REACT_APP_NETWORK=sepolia

# Backend (Optional)
MONGODB_URI=mongodb://localhost:27017/escrow
PORT=5000
```

> ⚠️ **Never commit your `.env` file to GitHub. It is already in `.gitignore`.**

---

## 📸 Screenshots

> *(Add your project screenshots here after running the app)*

| Dashboard | Create Escrow |
|---|---|
| ![Dashboard](screenshots/dashboard.png) | ![Create](screenshots/create.png) |

| Contract Detail | Transaction Timeline |
|---|---|
| ![Detail](screenshots/detail.png) | ![Timeline](screenshots/timeline.png) |

---

## 🔮 Future Improvements

- [ ] 📁 **IPFS Integration** — Store project deliverables on decentralized storage
- [ ] 💵 **Stablecoin Support** — Accept USDT / USDC (ERC-20) payments
- [ ] ⭐ **Reputation System** — On-chain freelancer ratings and reviews
- [ ] ⚡ **Layer-2 Deployment** — Deploy on Polygon for lower gas fees
- [ ] 🤝 **Dispute Resolution** — Multi-signature panel for conflict resolution
- [ ] 🌐 **Production Launch** — Full commercial freelance marketplace

---

## 👨‍💻 Author

**Your Name**
- GitHub: (https://github.com/sayali19425-gif)
- Email: sayali19425@gmail.com

---

# License

This project is developed for educational and demonstration purposes.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

Made with ❤️ using Ethereum, Solidity, React JS, and ethers.js

</div>
