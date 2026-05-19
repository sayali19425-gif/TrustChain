import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "./contract";
import Navbar from "./components/Navbar";
import CreateEscrow from "./components/CreateEscrow";
import EscrowList from "./components/EscrowList";

export default function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [escrows, setEscrows] = useState([]);
  const [tab, setTab] = useState("list"); // "list" | "create"

  const connect = async () => {
    const { contract, signer } = await getContract();
    setAccount(await signer.getAddress());
    setContract(contract);
  };

  const loadEscrows = async () => {
    if (!contract) return;
    const data = await contract.getAll();
    setEscrows([...data].reverse());
  };

  useEffect(() => { loadEscrows(); }, [contract]);

  if (!account) return (
    <div className="center-page">
      <div className="hero">
        <h1>⬡ EscrowChain</h1>
        <p>Trustless freelance payments on Ethereum</p>
        <button onClick={connect}>Connect MetaMask</button>
      </div>
    </div>
  );

  return (
    <div className="app">
      <Navbar account={account} />
      <div className="tabs">
        <button className={tab === "list" ? "active" : ""} onClick={() => setTab("list")}>My Escrows</button>
        <button className={tab === "create" ? "active" : ""} onClick={() => setTab("create")}>+ New</button>
      </div>
      <div className="content">
        {tab === "create"
          ? <CreateEscrow contract={contract} onDone={() => { setTab("list"); loadEscrows(); }} />
          : <EscrowList escrows={escrows} contract={contract} account={account} onUpdate={loadEscrows} />
        }
      </div>
    </div>
  );
}