# TrustChain — Blockchain-Based Freelance Escrow System

A decentralized freelance escrow platform built on the Ethereum blockchain that enables secure, transparent, and trustless payments between clients and freelancers using smart contracts.

This project eliminates the need for centralized intermediaries by locking ETH inside blockchain-based escrow contracts until project approval. Payments are automatically released through Solidity smart contracts, ensuring fairness and transparency for both parties.

---

## Features

- Secure ETH escrow using Ethereum smart contracts
- Client and freelancer workflow
- MetaMask wallet integration
- Automatic payment release on approval
- Refund mechanism for clients
- Real-time blockchain interaction using ethers.js
- React-based responsive frontend
- Node.js + Express backend
- MongoDB project storage
- Modern Web3 UI/UX

---

# Tech Stack

## Frontend
- React JS
- Vite
- ethers.js v6
- CSS3

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Blockchain
- Solidity
- Ethereum Sepolia Testnet
- MetaMask
- Hardhat

---

# Project Structure

```bash
freelance-escrow/
│
├── backend/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateEscrow.jsx
│   │   │   ├── EscrowList.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── contract.js
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

---

# How It Works

## 1. Connect Wallet
The client connects MetaMask to the application.

## 2. Create Escrow
The client enters:
- Project title
- Freelancer wallet address
- ETH amount

ETH is then locked inside the smart contract.

## 3. Freelancer Starts Work
The freelancer can verify that funds are securely stored on-chain.

## 4. Approve Work
Once the project is completed, the client approves the work.

The smart contract instantly releases ETH to the freelancer.

## 5. Refund Option
If the project is not delivered, the client can refund the locked amount before approval.

---

# Smart Contract Functions

## `createEscrow()`
Creates a new escrow contract and locks ETH.

## `approveWork()`
Releases payment to the freelancer.

## `refundClient()`
Returns ETH to the client.

## `getBalance()`
Returns the contract balance.

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/sayali19425-gif/TrustChain.git
cd TrustChain
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

# MongoDB Setup

Make sure MongoDB is installed and running locally.

Default database used:

```bash
mongodb://localhost:27017/escrow
```

---

# MetaMask Setup

1. Install MetaMask extension
2. Connect to Sepolia Testnet
3. Add Sepolia ETH using faucet
4. Connect wallet to application

---

# Screenshots

## Dashboard
- View active escrows
- Track payments
- Approve or refund transactions

## Create Escrow
- Enter freelancer address
- Lock ETH securely
- Deploy escrow contract

## Contract Interaction
- Real blockchain transaction flow
- MetaMask transaction confirmation
- Transaction history tracking

---

# Security Features

- Funds locked directly in smart contract
- Only client can approve or refund
- Transparent on-chain transactions
- Immutable blockchain event logs
- No third-party fund custody

---

# Future Improvements

- Multi-signature dispute resolution
- IPFS decentralized file storage
- Freelancer reputation system
- ERC-20 stablecoin support
- Polygon / Layer-2 deployment
- Milestone-based partial payments
- Real-time notifications

---

# Learning Outcomes

This project demonstrates:
- Solidity smart contract development
- Web3 frontend integration
- MetaMask connectivity
- Ethereum transaction handling
- Full-stack blockchain architecture
- React + Node.js development

---

# Author

**Sayali Sandip Nighot**  
---

# License

This project is developed for educational and demonstration purposes.
