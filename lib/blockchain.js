const { ethers } = require("ethers");
require("dotenv").config();
const contractConfig = require("./contract-config.json");

const CONTRACT_ABI = [
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function balanceOf(address account) public view returns (uint256)",
  "function mint(address to, uint256 amount) public",
  "function decimals() public view returns (uint8)"
];

let contract;
let signer;

async function initContract() {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    contract = new ethers.Contract(
      contractConfig.contractAddress,
      CONTRACT_ABI,
      signer
    );

    console.log("✅ Contrato inicializado");
    return contract;
  } catch (error) {
    console.error("❌ Erro ao inicializar contrato:", error.message);
    throw error;
  }
}

async function transferTokens(toAddress, amount) {
  try {
    if (!contract) await initContract();

    const amountWithDecimals = ethers.parseUnits(amount.toString(), 18);
    const tx = await contract.transfer(toAddress, amountWithDecimals);
    const receipt = await tx.wait();

    return {
      success: true,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error("❌ Erro ao transferir tokens:", error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

async function getBalance(address) {
  try {
    if (!contract) await initContract();

    const balance = await contract.balanceOf(address);
    const formatted = ethers.formatUnits(balance, 18);

    return {
      wallet: address,
      balance: balance.toString(),
      balanceFormatted: formatted
    };
  } catch (error) {
    console.error("❌ Erro ao buscar saldo:", error.message);
    throw error;
  }
}

module.exports = {
  initContract,
  transferTokens,
  getBalance
};