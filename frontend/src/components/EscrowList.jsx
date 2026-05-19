import { ethers } from "ethers";

const STATUS = ["ACTIVE", "COMPLETED", "CANCELLED"];
const COLOR = ["#3b82f6", "#10b981", "#ef4444"];

export default function EscrowList({ escrows, contract, account, onUpdate }) {
  const approve = async (id) => {
    try { const tx = await contract.approveWork(id); await tx.wait(); onUpdate(); }
    catch (e) { alert(e.reason || "Failed"); }
  };

  const cancel = async (id) => {
    try { const tx = await contract.cancelEscrow(id); await tx.wait(); onUpdate(); }
    catch (e) { alert(e.reason || "Failed"); }
  };

  if (escrows.length === 0) return <p className="empty">No escrows yet. Create one!</p>;

  return (
    <div className="list">
      {escrows.map((e, i) => {
        const isClient = e.client.toLowerCase() === account.toLowerCase();
        const isActive = Number(e.status) === 0;
        return (
          <div className="card" key={i}>
            <div className="card-top">
              <strong>{e.title}</strong>
              <span className="badge" style={{ color: COLOR[Number(e.status)] }}>{STATUS[Number(e.status)]}</span>
            </div>
            <p>💰 {ethers.formatEther(e.amount)} ETH</p>
            <p>👤 Client: {e.client.slice(0, 8)}...</p>
            <p>🧑‍💻 Freelancer: {e.freelancer.slice(0, 8)}...</p>
            {isClient && isActive && (
              <div className="actions">
                <button className="approve" onClick={() => approve(e.id)}>✅ Approve & Pay</button>
                <button className="cancel" onClick={() => cancel(e.id)}>❌ Cancel</button>
              </div>
            )}
            {!isClient && isActive && <p className="hint">⏳ Waiting for client approval</p>}
          </div>
        );
      })}
    </div>
  );
}