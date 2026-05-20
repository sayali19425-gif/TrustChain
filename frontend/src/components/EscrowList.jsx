import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function EscrowList({
  escrows,
  account
}) {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("projects")) || [];

    if (saved.length > 0) {
      setProjects(saved);
    } else {
      setProjects(escrows);
    }

  }, [escrows]);

  const fundProject = async (project) => {

    try {

      if (!window.ethereum) {
        return alert("Install MetaMask");
      }

      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const wallets =
        JSON.parse(
          localStorage.getItem("creatorWallets")
        ) || {};

      const creatorWallet =
         wallets[String(project.id)];

         if (!creatorWallet) {
        return alert("Creator wallet not found");
      }

        console.log(creatorWallet);

      const tx = await signer.sendTransaction({
        to: creatorWallet,
        value: project.budget
      });

      await tx.wait();

      const updated = projects.map((p) => {

        if (p.id === project.id) {
          return {
            ...p,
            funded: true,
            budget: p.budget.toString()
          };
        }

        return {
          ...p,
          budget: p.budget.toString()
        };
      });

      setProjects(updated);

      localStorage.setItem(
        "projects",
        JSON.stringify(updated)
      );

      alert("Project Funded Successfully!");

    } catch (e) {
      console.error(e);
      alert("Funding failed");
    }
  };

  if (projects.length === 0) {
    return <p className="empty">No projects yet.</p>;
  }

  return (
    <div className="list">

      {projects.map((e, i) => {

        return (
          <div className="card" key={i}>

            <div className="card-top">

              <strong>{e.title}</strong>

              <span
                className="badge"
                style={{
                  color: e.funded
                    ? "#10b981"
                    : "#ef4444"
                }}
              >
                {e.funded
                  ? "FUNDED"
                  : "UNFUNDED"}
              </span>

            </div>

            <p>
              🔗 {e.description}
            </p>

            <p>
              💰 {ethers.formatEther(e.budget)} ETH
            </p>

            <p>
              👤 Creator:
              {" "}
              {e.buyer.slice(0, 8)}...
            </p>

            {!e.funded && (
              <button
                onClick={() => fundProject(e)}
              >
                Fund Project
              </button>
            )}

          </div>
        );
      })}

    </div>
  );
}