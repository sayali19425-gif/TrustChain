import { useState } from "react";
import { ethers } from "ethers";

export default function CreateEscrow({
  contract,
  onDone
}) {

  const [form, setForm] = useState({
    creator: "",
    title: "",
    link: "",
    amount: ""
  });

  const [loading, setLoading] =
    useState(false);

  const submit = async () => {

    if (
      !form.creator ||
      !form.title ||
      !form.link ||
      !form.amount
    ) {
      return alert("Fill all fields");
    }

    setLoading(true);

    try {

      const tx =
        await contract.createProject(
          form.title,
          form.link,
          ethers.parseEther(form.amount),
          7
        );

      await tx.wait();

      // save creator wallet locally
      const saved =
        JSON.parse(
          localStorage.getItem("creatorWallets")
        ) || {};

      const count =
        await contract.projectCount();

      const projectId =
        Number(count) - 1;

      saved[String(Number(count))] = form.creator;

      localStorage.setItem(
        "creatorWallets",
        JSON.stringify(saved)
      );

      alert("Project Created");

      onDone();

    } catch (e) {

      console.error(e);

      alert("Transaction failed");
    }

    setLoading(false);
  };

  return (
    <div className="card">

      <h2>Create Project</h2>

      <input
        placeholder="Creator Wallet Address"
        value={form.creator}
        onChange={(e) =>
          setForm({
            ...form,
            creator: e.target.value
          })
        }
      />

      <input
        placeholder="Project Name"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title: e.target.value
          })
        }
      />

      <input
        placeholder="Project Link"
        value={form.link}
        onChange={(e) =>
          setForm({
            ...form,
            link: e.target.value
          })
        }
      />

      <input
        placeholder="Amount in ETH"
        type="number"
        value={form.amount}
        onChange={(e) =>
          setForm({
            ...form,
            amount: e.target.value
          })
        }
      />

      <button
        onClick={submit}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : "Create Project"}
      </button>

    </div>
  );
}