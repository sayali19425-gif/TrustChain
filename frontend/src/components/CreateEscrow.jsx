import { useState } from "react";
import { ethers } from "ethers";

export default function CreateEscrow({ contract, onDone }) {
  const [form, setForm] = useState({ title: "", freelancer: "", amount: "" });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.title || !form.freelancer || !form.amount) return alert("Fill all fields");
    setLoading(true);
    try {
      const tx = await contract.createEscrow(form.freelancer, form.title, {
        value: ethers.parseEther(form.amount)
      });
      await tx.wait();
      onDone();
    } catch (e) {
      alert(e.reason || "Transaction failed");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Create Escrow</h2>
      <input placeholder="Project Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Freelancer Address (0x...)" value={form.freelancer} onChange={e => setForm({ ...form, freelancer: e.target.value })} />
      <input placeholder="Amount in ETH (e.g. 0.05)" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
      <button onClick={submit} disabled={loading}>{loading ? "Processing..." : "🔒 Lock Funds"}</button>
    </div>
  );
}