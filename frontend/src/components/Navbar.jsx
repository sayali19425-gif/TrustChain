export default function Navbar({ account }) {
  const short = `${account.slice(0, 6)}...${account.slice(-4)}`;
  return (
    <nav className="navbar">
      <span className="brand">⬡ EscrowChain</span>
      <span className="wallet">🟢 {short}</span>
    </nav>
  );
}