# 🏗️  Token MVP

Plataforma de tokenização de terreno com blockchain Ethereum.

## ⚙️ Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Infura ou Alchemy (RPC Sepolia)
- Sepolia testnet ETH (faucet: https://sepoliafaucet.com)
- Conta Etherscan (API key)

## 📦 Setup Local

### 1. Clone e instale
```bash
git clone <seu-repo>
cd terreno-token-mvp
npm install
```

### 2. Configure .env
```bash
cp .env.example .env
```

Preencha:
```env
PRIVATE_KEY=sua_private_key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
ETHERSCAN_API_KEY=sua_etherscan_key
```

### 3. Compile o contrato
```bash
npx hardhat compile
```

### 4. Deploy na Sepolia
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Salve o `CONTRACT_ADDRESS` exibido.

### 5. Atualize .env
```env
CONTRACT_ADDRESS=0x...
```

### 6. Rode o servidor
```bash
npm start
```

Servidor em `http://localhost:3000`

## 🧪 Teste os Endpoints

### Health
```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "contract": "0x...",
  "network": "sepolia"
}
```

### Get Balance
```bash
curl http://localhost:3000/api/balance/0x742d35Cc6634C0532925a3b844Bc4e70d6b60e3e
```

**Response:**
```json
{
  "wallet": "0x742d35Cc6634C0532925a3b844Bc4e70d6b60e3e",
  "balance": "1000000000000000000",
  "balanceFormatted": "1.0"
}
```

### Buy (Transfer Tokens)
```bash
curl -X POST http://localhost:3000/api/buy \
  -H "Content-Type: application/json" \
  -d '{
    "wallet": "0x742d35Cc6634C0532925a3b844Bc4e70d6b60e3e",
    "amount": 100
  }'
```

**Response:**
```json
{
  "success": true,
  "txHash": "0x...",
  "blockNumber": 123456,
  "message": "100 tokens enviados para 0x..."
}
```

## 🚀 Deploy Vercel

### 1. Instale Vercel CLI
```bash
npm install -g vercel
```

### 2. Link ao repositório
```bash
vercel link
```

### 3. Configure variáveis
```bash
vercel env add PRIVATE_KEY
vercel env add SEPOLIA_RPC_URL
vercel env add CONTRACT_ADDRESS
```

### 4. Deploy
```bash
vercel --prod
```

## 🔍 Verificar Contrato

https://sepolia.etherscan.io/address/0x...

## 📚 Estrutura
```
terreno-token-mvp/
├── contracts/           # Smart Contracts
├── scripts/            # Deploy scripts
├── api/                # Backend Express
├── lib/                # Utilitários blockchain
└── README.md
```

## ⚠️ Troubleshooting

**Erro: "Contract not found"**
- Verifique `lib/contract-config.json`
- Confirme deploy foi bem-sucedido

**Erro: "Invalid private key"**
- Remova `0x` se começar com ele
- Confirme no `.env`

**Erro: "Insufficient balance"**
- Faucet Sepolia: https://sepoliafaucet.com
- Aguarde confirmação

## 📄 Licença
ISC# token-blockchain
