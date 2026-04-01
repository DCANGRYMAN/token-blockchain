const express = require("express");
const { transferTokens, getBalance, initContract } = require("../lib/blockchain");
require("dotenv").config();
const contractConfig = require("../lib/contract-config.json");

const app = express();
app.use(express.json());

// Health Check
app.get("/api/health", async (req, res) => {
  try {
    await initContract();
    return res.status(200).json({
      status: "ok",
      contract: contractConfig.contractAddress,
      network: contractConfig.network
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: error.message
    });
  }
});

// Buy (transfer tokens)
app.post("/api/buy", async (req, res) => {
  try {
    const { wallet, amount } = req.body;

    // Validações básicas
    if (!wallet || !amount) {
      return res.status(400).json({
        success: false,
        error: "Faltam parâmetros: wallet e amount"
      });
    }

    if (!ethers.isAddress(wallet)) {
      return res.status(400).json({
        success: false,
        error: "Wallet inválida"
      });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Amount deve ser um número positivo"
      });
    }

    console.log(`💰 Mock pagamento recebido: ${amount} tokens para ${wallet}`);

    const result = await transferTokens(wallet, amount);

    if (result.success) {
      return res.status(200).json({
        success: true,
        txHash: result.txHash,
        blockNumber: result.blockNumber,
        message: `${amount} tokens enviados para ${wallet}`
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get Balance
app.get("/api/balance/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;

    if (!ethers.isAddress(wallet)) {
      return res.status(400).json({
        success: false,
        error: "Wallet inválida"
      });
    }

    const balance = await getBalance(wallet);
    return res.status(200).json(balance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📡 /api/health`);
  console.log(`💳 POST /api/buy`);
  console.log(`💰 GET /api/balance/:wallet`);
});

module.exports = app;