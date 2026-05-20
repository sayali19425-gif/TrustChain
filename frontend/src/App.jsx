import { useState, useEffect } from "react";
import { getContract } from "./contract";
import Navbar from "./components/Navbar";
import CreateEscrow from "./components/CreateEscrow";
import EscrowList from "./components/EscrowList";

export default function App() {

  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const [escrows, setEscrows] = useState([]);

  const [role, setRole] = useState(null);

  const connect = async (selectedRole) => {

    try {

      const { contract, signer } = await getContract();

      const address = await signer.getAddress();

      setAccount(address);

      setContract(contract);

      setRole(selectedRole);

    } catch (e) {
      console.error(e);
      alert("MetaMask connection failed");
    }
  };

  const loadEscrows = async () => {

    if (!contract) return;

    try {

      const count = await contract.projectCount();

      let items = [];

      for (let i = 1; i <= Number(count); i++) {

        const p = await contract.getProject(i);

        items.push({
          id: Number(p.id),
          title: p.title,
          description: p.description,
          buyer: p.buyer,
          budget: p.budget,
          funded: p.fundsDeposited
        });
      }

      setEscrows(items.reverse());

    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadEscrows();
  }, [contract]);

  // LANDING PAGE
  if (!account) {

    return (
      <div className="center-page">

        <div className="hero">

          <h1>⬡ EscrowChain</h1>

          <p>
            Trustless freelance payments on Ethereum
          </p>

          <div className="role-buttons">

            <button
              onClick={() => connect("creator")}
            >
              Creator
            </button>

            <button
              onClick={() => connect("funder")}
            >
              Funder
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (

    <div className="app">

      <Navbar
        account={account}
      />

      <div className="content">

        {role === "creator" ? (

          <CreateEscrow
            contract={contract}
            onDone={loadEscrows}
          />

        ) : (

          <EscrowList
            escrows={escrows}
            account={account}
          />

        )}

      </div>

    </div>
  );
}