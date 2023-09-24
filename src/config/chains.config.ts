import { Chain } from "interfaces/chain.interface";

export const CHAINS: Chain[] = [
  {
    chainId: 137,
    logoURI:
      "https://research.binance.com/static/images/projects/matic-network/logo.png",
    name: "Polygon",
    symbol: "MATIC",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: [
      "https://polygon-rpc.com/",
      "https://rpc-mainnet.maticvigil.com/",
    ],
    explorer: "https://polygonscan.com/",
  },
  {
    chainId: 42161,
    logoURI:
      "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/arbitrum.svg",
    name: "Arbitrum",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://rpc.ankr.com/arbitrum"],
    explorer: "https://arbiscan.io/",
  },
  {
    chainId: 8453,
    logoURI:
      "https://storage.googleapis.com/ethglobal-api-production/organizations%2Fh5ps8%2Flogo%2F1678294488367_W-9qsu1e_400x400.jpeg",
    name: "Base",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://base.publicnode.com"],
    explorer: "https://basescan.org/",
  },
  {
    chainId: 59144,
    logoURI: "https://assets.debank.com/static/media/linea.2cdc0d38.svg",
    name: "Linea",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://rpc.linea.build"],
    explorer: "https://arbiscan.io/",
  },
  {
    chainId: 42220,
    logoURI:
      "https://storage.googleapis.com/ethglobal-api-production/organizations%2Finotq%2Flogo%2F1678316332198_InjXBNx9_400x400.jpeg",
    name: "Celo",
    symbol: "CELO",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://1rpc.io/celo"],
    explorer: "https://explorer.celo.org/mainnet/",
  },
  {
    chainId: 100,
    logoURI: "https://icons.llamao.fi/icons/chains/rsz_xdai.jpg",
    name: "Gnosis",
    symbol: "XDAI",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://rpc.gnosischain.com"],
    explorer: "https://gnosisscan.io/",
  },
  {
    chainId: 534352,
    logoURI:
      "https://storage.googleapis.com/ethglobal-api-production/organizations%2Fyip67%2Fimages%2F5122.png",
    name: "Scroll",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://rpc.scroll.io"],
    explorer: "https://scroll.io/rollupscan/",
  },
  {
    chainId: 1,
    logoURI:
      "https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg",
    name: "Ethereum",
    symbol: "ETH",
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
    rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    explorer: "https://etherscan.io/",
  },
];
