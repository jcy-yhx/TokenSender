# 🚀 Tsender - Multi-Chain Token Airdrop Tool

[English](#english) | [中文](#中文)

---

## English

### Overview

**Tsender** is a multi-chain token airdrop distribution platform built with Next.js and Web3 technologies. It enables users to efficiently distribute ERC20 tokens to multiple recipients across different blockchain networks with a single transaction.

### Key Features

- 🌐 **Multi-Chain Support**: Deploy airdrops on 7+ major EVM chains
- 💳 **Gas Efficient**: Batch token transfers in a single transaction
- 🔐 **Web3 Integration**: Uses RainbowKit for wallet connection and Wagmi for contract interactions
- 📱 **User-Friendly Interface**: Intuitive UI for address and amount input
- 💾 **Local Storage**: Auto-save form data for seamless workflow
- ✅ **Real-time Validation**: Check token decimals and user balance
- 🔄 **Multi-format Support**: Handle both approval (ERC20 approve) and no-check scenarios

### Supported Networks

| Network | Chain ID | Status |
|---------|----------|--------|
| Ethereum Mainnet | 1 | ✅ Active |
| Arbitrum One | 42161 | ✅ Active |
| Optimism | 10 | ✅ Active |
| Base | 8453 | ✅ Active |
| zkSync Era | 324 | ✅ Active |
| Sepolia Testnet | 11155111 | ✅ Active |
| Local Anvil | 31337 | ✅ Development |

### Quick Start

#### Prerequisites

- Node.js 18+ and npm/pnpm
- Wallet (MetaMask, WalletConnect, etc.)
- WalletConnect Project ID ([get one here](https://cloud.walletconnect.com))

#### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ts-tsender

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your WalletConnect Project ID
```

#### Running Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

#### Running with Local Blockchain (Anvil)

```bash
# In one terminal, start anvil with pre-deployed contracts
pnpm anvil

# In another terminal, run the dev server
pnpm dev
```

### Usage Guide

1. **Connect Wallet**: Click the "Connect Wallet" button and select your preferred wallet provider
2. **Select Network**: Choose the target blockchain from the connected wallet
3. **Enter Token Address**: Paste the ERC20 token contract address
4. **Add Recipients**: Enter recipient addresses (one per line)
5. **Set Amounts**: Specify token amounts for each recipient (one per line)
6. **Approve/Execute**: 
   - If using no-check version: Approve token transfer, then execute airdrop
   - If using regular version: Approve token transfer, then execute airdrop
7. **Confirm Transaction**: Sign the transaction in your wallet

### Contract Addresses

Tsender smart contracts are deployed at:

```typescript
// Ethereum Mainnet (1)
0x3aD9F29AB266E4828450B33df7a9B9D7355Cd821

// Arbitrum One (42161)
0xA2b5aEDF7EEF6469AB9cBD99DE24a6881702Eb19

// Optimism (10)
0xAaf523DF9455cC7B6ca5637D01624BC00a5e9fAa

// Base (8453)
0x31801c3e09708549c1b2c9E1CFbF001399a1B9fa

// zkSync Era (324)
0x7e645Ea4386deb2E9e510D805461aA12db83fb5E

// Sepolia Testnet (11155111)
0xa27c5C77DA713f410F9b15d4B0c52CAe597a973a

// Local Anvil (31337)
0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── AirdropForm.tsx       # Main airdrop form component
│   ├── Header.tsx            # Navigation header
│   ├── HomeContent.tsx        # Home page content
│   └── ui/                    # UI components
├── utils/
│   └── calculateTotal.ts      # Amount calculation utility
├── constants.ts              # Chain and contract configurations
└── rainbowKitConfig.tsx       # Wallet connection setup
```

### Development

#### Running Tests

```bash
# Unit tests
pnpm test:unit

# E2E tests with Playwright
pnpm test:e2e
```

#### Building for Production

```bash
pnpm build
pnpm start
```

### Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org) with React 19
- **Styling**: Tailwind CSS 4
- **Web3**: 
  - [Wagmi](https://wagmi.sh) - React hooks for blockchain interactions
  - [Viem](https://viem.sh) - TypeScript Ethereum library
  - [RainbowKit](https://www.rainbowkit.com) - Wallet connection UI
- **React Query**: [TanStack Query](https://tanstack.com/query/latest) - Data fetching
- **UI Components**: Lucide React icons, React Hot Toast notifications

### Optimization Notes

- Transactions return immediately after submission to mempool
- Consider waiting for block confirmation for critical operations
- Local storage auto-saves form state for better UX

### Deployment

Deploy on [Vercel](https://vercel.com) (recommended):

```bash
vercel
```

Or build and deploy manually:

```bash
pnpm build
# Deploy the .next folder to your hosting platform
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

This project is licensed under the MIT License.

---

## 中文

### 项目介绍

**Tsender** 是一个基于 Next.js 和 Web3 技术的多链 Token 空投分发平台。它允许用户在一次交易中将 ERC20 代币高效地分发给多个接收者，支持多个区块链网络。

### 核心特性

- 🌐 **多链支持**: 在 7+ 个主流 EVM 链上部署空投
- 💳 **Gas 高效**: 在单笔交易中批量转账 Token
- 🔐 **Web3 集成**: 使用 RainbowKit 连接钱包，Wagmi 与智能合约交互
- 📱 **用户友好**: 直观的地址和数量输入界面
- 💾 **本地存储**: 自动保存表单数据，无缝保持工作流
- ✅ **实时验证**: 检查 Token 小数位和用户余额
- 🔄 **多格式支持**: 支持 ERC20 approve 和 no-check 两种模式

### 支持的网络

| 网络 | Chain ID | 状态 |
|------|----------|------|
| 以太坊主网 | 1 | ✅ 活跃 |
| Arbitrum One | 42161 | ✅ 活跃 |
| Optimism | 10 | ✅ 活跃 |
| Base | 8453 | ✅ 活跃 |
| zkSync Era | 324 | ✅ 活跃 |
| Sepolia 测试网 | 11155111 | ✅ 活跃 |
| 本地 Anvil | 31337 | ✅ 开发 |

### 快速开始

#### 前置条件

- Node.js 18+ 和 npm/pnpm
- Web3 钱包（MetaMask、WalletConnect 等）
- WalletConnect 项目 ID ([获取链接](https://cloud.walletconnect.com))

#### 安装

```bash
# 克隆仓库
git clone <repository-url>
cd ts-tsender

# 安装依赖
pnpm install

# 设置环境变量
cp .env.example .env.local
# 编辑 .env.local，添加 WalletConnect Project ID
```

#### 运行开发服务器

```bash
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

#### 使用本地区块链运行 (Anvil)

```bash
# 在一个终端中运行 Anvil 和预部署合约
pnpm anvil

# 在另一个终端运行开发服务器
pnpm dev
```

### 使用指南

1. **连接钱包**: 点击"连接钱包"按钮，选择钱包提供商
2. **选择网络**: 在连接的钱包中选择目标区块链
3. **输入 Token 地址**: 粘贴 ERC20 Token 合约地址
4. **添加接收者**: 输入接收者地址（每行一个）
5. **设置金额**: 为每个接收者指定 Token 数量（每行一个）
6. **批准/执行**:
   - 点击"批准"进行 Token 授权
   - 交易确认后点击"发送空投"
   - 在钱包中签署交易
7. **交易确认**: 等待交易被广播到区块链

### 智能合约地址

Tsender 智能合约部署地址：

```typescript
// 以太坊主网 (1)
0x3aD9F29AB266E4828450B33df7a9B9D7355Cd821

// Arbitrum One (42161)
0xA2b5aEDF7EEF6469AB9cBD99DE24a6881702Eb19

// Optimism (10)
0xAaf523DF9455cC7B6ca5637D01624BC00a5e9fAa

// Base (8453)
0x31801c3e09708549c1b2c9E1CFbF001399a1B9fa

// zkSync Era (324)
0x7e645Ea4386deb2E9e510D805461aA12db83fb5E

// Sepolia 测试网 (11155111)
0xa27c5C77DA713f410F9b15d4B0c52CAe597a973a

// 本地 Anvil (31337)
0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 项目结构

```
src/
├── app/              # Next.js 应用路由页面
├── components/       # React 组件
│   ├── AirdropForm.tsx       # 空投表单主组件
│   ├── Header.tsx            # 导航头
│   ├── HomeContent.tsx        # 主页内容
│   └── ui/                    # UI 基础组件
├── utils/
│   └── calculateTotal.ts      # 金额计算工具
├── constants.ts              # 链和合约配置
└── rainbowKitConfig.tsx       # 钱包连接配置
```

### 开发

#### 运行测试

```bash
# 单元测试
pnpm test:unit

# Playwright E2E 测试
pnpm test:e2e
```

#### 生产构建

```bash
pnpm build
pnpm start
```

### 技术栈

- **框架**: [Next.js 16](https://nextjs.org) + React 19
- **样式**: Tailwind CSS 4
- **Web3 技术**:
  - [Wagmi](https://wagmi.sh) - 区块链交互 React Hooks
  - [Viem](https://viem.sh) - TypeScript 以太坊库
  - [RainbowKit](https://www.rainbowkit.com) - 钱包连接 UI
- **数据获取**: [TanStack Query](https://tanstack.com/query/latest)
- **UI 库**: Lucide React 图标、React Hot Toast 通知

### 性能优化

- 交易提交后立即返回，无需等待区块确认
- 对于关键操作，建议等待区块确认后再执行后续操作
- 表单状态自动保存至本地存储，提升用户体验

### 部署

推荐使用 [Vercel](https://vercel.com) 部署：

```bash
vercel
```

或手动构建并部署：

```bash
pnpm build
# 将 .next 文件夹部署到托管平台
```

### 贡献

欢迎提交 Pull Request 进行改进！

### 许可证

本项目采用 MIT 许可证。
