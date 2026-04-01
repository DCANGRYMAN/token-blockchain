const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🚀 Iniciando deploy do TerrenoToken na rede Sepolia...");

  const TerrenoToken = await hre.ethers.getContractFactory("TerrenoToken");
  const terreno = await TerrenoToken.deploy();

  await terreno.waitForDeployment();
  const contractAddress = await terreno.getAddress();

  console.log("✅ Contrato deployado em:", contractAddress);

  // Salvar endereço em arquivo
  const config = {
    contractAddress: contractAddress,
    network: "sepolia",
    chainId: 11155111,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync("./lib/contract-config.json", JSON.stringify(config, null, 2));
  console.log("📝 Configuração salva em lib/contract-config.json");

  console.log("\n🔍 Verifique seu contrato em:");
  console.log(`https://sepolia.etherscan.io/address/${contractAddress}`);
  console.log("\n💡 Atualize o .env com:");
  console.log(`CONTRACT_ADDRESS=${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });