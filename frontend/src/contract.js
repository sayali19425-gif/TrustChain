import { ethers } from "ethers";

export const ADDRESS = "0x1bdEC89Cff79E8E148315ED3151B754229a012FB";

export const ABI = [
  "function createEscrow(address _freelancer, string _title) payable",
  "function approveWork(uint256 _id)",
  "function cancelEscrow(uint256 _id)",
  "function getAll() view returns (tuple(uint256 id, address client, address freelancer, uint256 amount, string title, uint8 status)[])",
  "function count() view returns (uint256)"
];

export const getContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return { contract: new ethers.Contract(ADDRESS, ABI, signer), signer };
};