import { Invest } from "interfaces/invest.interface";

export const V3Invests: Invest[] = [
  {
    id: "64ee0317398fb056385a33c7",
    name: "Ethereum-UniswapV3-LDO+USDC-10000",
    chainId: 1,
    address: "0x78235D08B2aE7a3E00184329212a4d7AcD2F9985",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 1186916.510275467,
    volumeUSD7D: 423151.034776,
    volumeUSD24H: 7876.356053002179,
    meta: {
      toaster: "0xB8e0CdbaD514Edc1E8e790F4B6f5F613361802a7",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 10000,
      tickSpacing: 200,
    },
    dynamicMeta: {
      aprList: [1349.230605721977, 999.3065227903228, 566.9270583606101],
      rangeList: [
        [-400, 200],
        [-600, 400],
        [-1200, 1000],
      ],
      tick: -4400,
    },
    apr: 999.3065227903228,
    apy: 932440.8684803888,
    tier: 2,
    inputAssets: [
      "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee032a398fb056385a35e9",
    name: "Arbitrum-UniswapV3-DAI+USDT-100",
    chainId: 42161,
    address: "0x7f580f8A02b759C350E6b8340e7c2d4b8162b6a9",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 310926.7042595638,
    volumeUSD7D: 4323905.102395603,
    volumeUSD24H: 337366.7711990476,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [11.36523759671157, 6.844464835559664, 3.120769989547333],
      rangeList: [
        [-2, 1],
        [-3, 2],
        [-6, 5],
      ],
      tick: -6,
    },
    apr: 6.844464835559664,
    apy: 7.079315790592089,
    tier: 1,
    inputAssets: [
      "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee032a398fb056385a35c3",
    name: "Arbitrum-UniswapV3-WETH+USDT-3000",
    chainId: 42161,
    address: "0xc82819F72A9e77E2c0c3A69B3196478f44303cf4",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 3770928.31078287,
    volumeUSD7D: 1494713.531734193,
    volumeUSD24H: 264143.1986842155,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 3000,
      tickSpacing: 60,
    },
    dynamicMeta: {
      aprList: [441.2940851638467, 266.7327331360975, 149.2143740722747],
      rangeList: [
        [-120, 60],
        [-180, 120],
        [-300, 240],
      ],
      tick: -74040,
    },
    apr: 266.7327331360975,
    apy: 1247.9503914786094,
    tier: 1.5,
    inputAssets: [
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee032a398fb056385a35d5",
    name: "Arbitrum-UniswapV3-LDO+WETH-3000",
    chainId: 42161,
    address: "0x52F9d14Bed8Ce6536dA063aaf274Ae2747ef4853",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 232881.9461731642,
    volumeUSD7D: 182373.2098804331,
    volumeUSD24H: 12963.06714137271,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 3000,
      tickSpacing: 60,
    },
    dynamicMeta: {
      aprList: [366.4196111404914, 267.62159453362, 173.8479406386526],
      rangeList: [
        [-60, 60],
        [-120, 60],
        [-180, 120],
      ],
      tick: 69660,
    },
    apr: 267.62159453362,
    apy: 1259.394586730446,
    tier: 2.5,
    inputAssets: [
      "0x13Ad51ed4F1B7e9Dc168d8a00cB3f4dDD85EfA60",
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee032a398fb056385a35f4",
    name: "Arbitrum-UniswapV3-DAI+USDC.e-100",
    chainId: 42161,
    address: "0xF0428617433652c9dc6D1093A42AdFbF30D29f74",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 1133656.99049634,
    volumeUSD7D: 6148208.538139561,
    volumeUSD24H: 1054166.897316277,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [4.309087982403191, 4.309087982403191, 2.873853982960187],
      rangeList: [
        [-1, 1],
        [-1, 1],
        [-2, 1],
      ],
      tick: 0,
    },
    apr: 4.309087982403191,
    apy: 4.4014142270849765,
    tier: 1,
    inputAssets: [
      "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee032a398fb056385a35db",
    name: "Arbitrum-UniswapV3-WETH+USDC.e-500",
    chainId: 42161,
    address: "0xC31E54c7a869B9FcBEcc14363CF510d1c41fa443",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 42798180.0232664,
    volumeUSD7D: 262656762.7089635,
    volumeUSD24H: 40875852.96536255,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [722.4783508013661, 376.4162263222762, 185.1607672277536],
      rangeList: [
        [-70, 60],
        [-130, 120],
        [-260, 250],
      ],
      tick: -74020,
    },
    apr: 376.4162263222762,
    apy: 3687.00263808045,
    tier: 1.5,
    inputAssets: [
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee032a398fb056385a35c2",
    name: "Arbitrum-UniswapV3-WETH+USDT-500",
    chainId: 42161,
    address: "0x641C00A822e8b671738d32a431a4Fb6074E5c79d",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 14563637.54768823,
    volumeUSD7D: 117250324.7948221,
    volumeUSD24H: 19634660.63477039,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [713.1032875566568, 344.2966703431366, 176.0487850499912],
      rangeList: [
        [-70, 60],
        [-140, 130],
        [-270, 260],
      ],
      tick: -74020,
    },
    apr: 344.2966703431366,
    apy: 2704.4138259607284,
    tier: 1.5,
    inputAssets: [
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee032a398fb056385a35f2",
    name: "Arbitrum-UniswapV3-USDT+USDC.e-500",
    chainId: 42161,
    address: "0x13398E27a21Be1218b6900cbEDF677571df42A48",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 862278.545035941,
    volumeUSD7D: 847945.3794244799,
    volumeUSD24H: 80586.30535304546,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [6.230797341976555, 6.230797341976555, 6.230797341976555],
      rangeList: [
        [-10, 10],
        [-10, 10],
        [-10, 10],
      ],
      tick: 0,
    },
    apr: 6.230797341976555,
    apy: 6.425037018560253,
    tier: 1,
    inputAssets: [
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee032a398fb056385a35c1",
    name: "Arbitrum-UniswapV3-WETH+USDC-500",
    chainId: 42161,
    address: "0xC6962004f452bE9203591991D15f6b388e09E8D0",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 14234868.75279048,
    volumeUSD7D: 139567107.9024049,
    volumeUSD24H: 19301021.89655709,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [594.8197613540846, 287.1419782908476, 146.8116307218557],
      rangeList: [
        [-70, 60],
        [-140, 130],
        [-270, 260],
      ],
      tick: -74020,
    },
    apr: 287.1419782908476,
    apy: 1536.1699260666633,
    tier: 1.5,
    inputAssets: [
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee032a398fb056385a35de",
    name: "Arbitrum-UniswapV3-USDC+DAI-100",
    chainId: 42161,
    address: "0x7CF803e8d82A50504180f417B8bC7a493C0a0503",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 226270.572449593,
    volumeUSD7D: 2482950.370693132,
    volumeUSD24H: 520194.5377620123,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [19.42190523270186, 19.42190523270186, 12.99213246303041],
      rangeList: [
        [-1, 1],
        [-1, 1],
        [-2, 1],
      ],
      tick: 0,
    },
    apr: 19.42190523270186,
    apy: 21.392298383233488,
    tier: 1,
    inputAssets: [
      "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee032a398fb056385a35c4",
    name: "Arbitrum-UniswapV3-WETH+DAI-3000",
    chainId: 42161,
    address: "0xA961F0473dA4864C5eD28e00FcC53a3AAb056c1b",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 577942.606136132,
    volumeUSD7D: 231430.7998342007,
    volumeUSD24H: 36797.97975599766,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 3000,
      tickSpacing: 60,
    },
    dynamicMeta: {
      aprList: [354.5579331531493, 220.7497986986563, 126.0418292000183],
      rangeList: [
        [-120, 60],
        [-180, 120],
        [-300, 240],
      ],
      tick: -74040,
    },
    apr: 220.7497986986563,
    apy: 768.7863189935516,
    tier: 1.5,
    inputAssets: [
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee032a398fb056385a35e8",
    name: "Arbitrum-UniswapV3-USDC+USDC.e-100",
    chainId: 42161,
    address: "0x8e295789c9465487074a65b1ae9Ce0351172393f",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 3201455.130852149,
    volumeUSD7D: 25390994.12223578,
    volumeUSD24H: 5447302.998778701,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [5.768356142920782, 5.768356142920782, 5.768356142920782],
      rangeList: [
        [-1, 1],
        [-1, 1],
        [-1, 1],
      ],
      tick: 0,
    },
    apr: 5.768356142920782,
    apy: 5.93458456783047,
    tier: 1,
    inputAssets: [
      "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee032a398fb056385a35dd",
    name: "Arbitrum-UniswapV3-USDC+USDT-100",
    chainId: 42161,
    address: "0xbE3aD6a5669Dc0B8b12FeBC03608860C31E2eef6",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 1287437.166118074,
    volumeUSD7D: 9023838.512822973,
    volumeUSD24H: 1840543.317526907,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [14.37715565151336, 8.634623689963144, 3.92807190364767],
      rangeList: [
        [-2, 1],
        [-3, 2],
        [-6, 5],
      ],
      tick: -6,
    },
    apr: 8.634623689963144,
    apy: 9.010565964928041,
    tier: 1,
    inputAssets: [
      "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee032a398fb056385a35f1",
    name: "Arbitrum-UniswapV3-USDT+USDC.e-100",
    chainId: 42161,
    address: "0x8c9D230D45d6CfeE39a6680Fb7CB7E8DE7Ea8E71",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 2201150.327465705,
    volumeUSD7D: 20615740.47974202,
    volumeUSD24H: 3512365.034728765,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [12.04412976399455, 7.233759693586729, 3.288876759933965],
      rangeList: [
        [-2, 1],
        [-3, 2],
        [-6, 5],
      ],
      tick: 3,
    },
    apr: 7.233759693586729,
    apy: 7.496416792112615,
    tier: 1,
    inputAssets: [
      "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee032a398fb056385a35dc",
    name: "Arbitrum-UniswapV3-WETH+USDC.e-3000",
    chainId: 42161,
    address: "0x17c14D2c404D167802b16C450d3c99F88F2c4F4d",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 13200778.03938415,
    volumeUSD7D: 12532455.13131258,
    volumeUSD24H: 2266964.092567205,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 3000,
      tickSpacing: 60,
    },
    dynamicMeta: {
      aprList: [371.5272024036406, 223.3224299236551, 124.466291989129],
      rangeList: [
        [-120, 60],
        [-180, 120],
        [-300, 240],
      ],
      tick: -74040,
    },
    apr: 223.3224299236551,
    apy: 790.4883361414471,
    tier: 1.5,
    inputAssets: [
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee031e398fb056385a34ae",
    name: "Polygon-UniswapV3-WMATIC+LDO-3000",
    chainId: 137,
    address: "0xD866faC7dB79994D08C0CA2221fee08935595B4B",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 384018.3742654456,
    volumeUSD7D: 388747.4820288249,
    volumeUSD24H: 40472.1576590836,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 3000,
      tickSpacing: 60,
    },
    dynamicMeta: {
      aprList: [200.1393073793858, 113.7626134616489, 55.0189950672987],
      rangeList: [
        [-180, 120],
        [-300, 240],
        [-600, 540],
      ],
      tick: 10380,
    },
    apr: 113.7626134616489,
    apy: 208.13275896642693,
    tier: 2.5,
    inputAssets: [
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      "0xC3C7d422809852031b44ab29EEC9F1EfF2A58756",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee031e398fb056385a34a8",
    name: "Polygon-UniswapV3-WMATIC+WETH-500",
    chainId: 137,
    address: "0x86f1d8390222A3691C28938eC7404A1661E618e0",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 3299463.692349046,
    volumeUSD7D: 12964696.37458603,
    volumeUSD24H: 1427292.636604786,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [237.7896330003149, 115.833254169366, 59.21564536380469],
      rangeList: [
        [-80, 70],
        [-160, 150],
        [-310, 300],
      ],
      tick: 80110,
    },
    apr: 115.833254169366,
    apy: 214.43893164598813,
    tier: 2,
    inputAssets: [
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee031e398fb056385a34d6",
    name: "Polygon-UniswapV3-WETH+LDO-3000",
    chainId: 137,
    address: "0xda908C0bf14AD0B61Ea5eBe671aC59B2cE091cBf",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 70691.6082658247,
    volumeUSD7D: 100686.902269667,
    volumeUSD24H: 8590.356902707368,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 3000,
      tickSpacing: 60,
    },
    dynamicMeta: {
      aprList: [150.8428135774256, 90.45587163593375, 50.43564245563841],
      rangeList: [
        [-180, 120],
        [-300, 240],
        [-540, 480],
      ],
      tick: -69720,
    },
    apr: 90.45587163593375,
    apy: 145.16989163628065,
    tier: 2.5,
    inputAssets: [
      "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      "0xC3C7d422809852031b44ab29EEC9F1EfF2A58756",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee031e398fb056385a34bb",
    name: "Polygon-UniswapV3-USDC+WETH-500",
    chainId: 137,
    address: "0x45dDa9cb7c25131DF268515131f647d726f50608",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 16345094.97349398,
    volumeUSD7D: 55366763.34784459,
    volumeUSD24H: 7809424.924381256,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [246.1953616524571, 120.3455809121897, 59.7338226810954],
      rangeList: [
        [-100, 90],
        [-200, 190],
        [-400, 390],
      ],
      tick: 73990,
    },
    apr: 120.3455809121897,
    apy: 228.62299395196555,
    tier: 1.5,
    inputAssets: [
      "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee031e398fb056385a34c0",
    name: "Polygon-UniswapV3-USDC+LDO-3000",
    chainId: 137,
    address: "0x3d0ACD52eE4A9271a0fFE75F9b91049152BaC64b",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 471532.8574180666,
    volumeUSD7D: 393727.319268,
    volumeUSD24H: 28599.64815499634,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 3000,
      tickSpacing: 60,
    },
    dynamicMeta: {
      aprList: [256.8533309724006, 122.7008139405541, 65.96444040148117],
      rangeList: [
        [-180, 120],
        [-360, 300],
        [-660, 600],
      ],
      tick: 4260,
    },
    apr: 122.7008139405541,
    apy: 236.27378495926754,
    tier: 2,
    inputAssets: [
      "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      "0xC3C7d422809852031b44ab29EEC9F1EfF2A58756",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee031e398fb056385a34cd",
    name: "Polygon-UniswapV3-DAI+USDT-100",
    chainId: 137,
    address: "0x254aa3A898071D6A2dA0DB11dA73b02B4646078F",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 132138.0696947053,
    volumeUSD7D: 1387951.42703844,
    volumeUSD24H: 104809.2294440717,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [15.82241286272115, 9.653229681386023, 4.44933656857237],
      rangeList: [
        [-2, 1],
        [-3, 2],
        [-6, 5],
      ],
      tick: -6,
    },
    apr: 9.653229681386023,
    apy: 10.124659545783498,
    tier: 1,
    inputAssets: [
      "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee031e398fb056385a34bc",
    name: "Polygon-UniswapV3-USDC+DAI-100",
    chainId: 137,
    address: "0x5645dCB64c059aa11212707fbf4E7F984440a8Cf",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 904959.6335083445,
    volumeUSD7D: 3414604.81754437,
    volumeUSD24H: 509452.1256990433,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [25.85413829333353, 25.85413829333353, 17.31620566503907],
      rangeList: [
        [-1, 1],
        [-1, 1],
        [-2, 1],
      ],
      tick: 0,
    },
    apr: 25.85413829333353,
    apy: 29.421039817906202,
    tier: 1,
    inputAssets: [
      "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee031e398fb056385a34ba",
    name: "Polygon-UniswapV3-USDC+USDT-100",
    chainId: 137,
    address: "0xDaC8A8E6DBf8c690ec6815e0fF03491B2770255D",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 2132781.890446077,
    volumeUSD7D: 23487964.096776,
    volumeUSD24H: 3552480.304193974,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [8.106948335626573, 4.865958385705165, 2.703915320092462],
      rangeList: [
        [-2, 1],
        [-3, 2],
        [-5, 4],
      ],
      tick: -6,
    },
    apr: 4.865958385705165,
    apy: 4.983901269747526,
    tier: 1,
    inputAssets: [
      "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee031e398fb056385a34a7",
    name: "Polygon-UniswapV3-WMATIC+USDT-500",
    chainId: 137,
    address: "0x9B08288C3Be4F62bbf8d1C20Ac9C5e6f9467d8B7",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 1985627.910545969,
    volumeUSD7D: 6441344.927140245,
    volumeUSD24H: 718372.5168838501,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [262.7552901670093, 135.1766162604736, 69.01025109829442],
      rangeList: [
        [-180, 170],
        [-350, 340],
        [-690, 680],
      ],
      tick: 6110,
    },
    apr: 135.1766162604736,
    apy: 279.8077124282145,
    tier: 1.5,
    inputAssets: [
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee031e398fb056385a34c9",
    name: "Polygon-UniswapV3-USDC+FRAX-500",
    chainId: 137,
    address: "0xbEAf7156bA07C3dF8FAc42E90188c5a752470DB7",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 72385.04008691329,
    volumeUSD7D: 310010.045617,
    volumeUSD24H: 32291.81001599878,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [63.36979737278724, 33.48418615032698, 17.23665211565491],
      rangeList: [
        [-19, 1],
        [-29, 11],
        [-49, 31],
      ],
      tick: -21,
    },
    apr: 33.48418615032698,
    apy: 39.62197405773158,
    tier: 1,
    inputAssets: [
      "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee031e398fb056385a34cc",
    name: "Polygon-UniswapV3-WETH+USDT-3000",
    chainId: 137,
    address: "0x4CcD010148379ea531D6C587CfDd60180196F9b1",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 595037.0702166514,
    volumeUSD7D: 255149.2454759743,
    volumeUSD24H: 13848.90631563962,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 3000,
      tickSpacing: 60,
    },
    dynamicMeta: {
      aprList: [117.183229576731, 52.66665734950809, 28.94291309491897],
      rangeList: [
        [-120, 60],
        [-240, 180],
        [-420, 360],
      ],
      tick: -74040,
    },
    apr: 52.66665734950809,
    apy: 68.87985404499896,
    tier: 1.5,
    inputAssets: [
      "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: false,
  },
  {
    id: "64ee031e398fb056385a34a6",
    name: "Polygon-UniswapV3-WMATIC+USDC-500",
    chainId: 137,
    address: "0xA374094527e1673A86dE625aa59517c5dE346d32",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 9055094.423111817,
    volumeUSD7D: 50512554.83739959,
    volumeUSD24H: 5755180.483596802,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [266.813951250697, 136.0837172622448, 69.16465117961843],
      rangeList: [
        [-180, 170],
        [-350, 340],
        [-690, 680],
      ],
      tick: 6110,
    },
    apr: 136.0837172622448,
    apy: 283.1802604316527,
    tier: 1.5,
    inputAssets: [
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee031e398fb056385a34a9",
    name: "Polygon-UniswapV3-WMATIC+WETH-3000",
    chainId: 137,
    address: "0x167384319B41F7094e62f7506409Eb38079AbfF8",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 5485876.883382988,
    volumeUSD7D: 1874441.796154381,
    volumeUSD24H: 158295.7940000296,
    meta: {
      toaster: "0xf7ac8a94b225b5ebd8b223d00c7bfbc96a893233",
      swapRouter: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
      positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
      factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      feeTier: 3000,
      tickSpacing: 60,
    },
    dynamicMeta: {
      aprList: [228.4483528403292, 137.9755133052879, 63.26271145351288],
      rangeList: [
        [-120, 60],
        [-180, 120],
        [-360, 300],
      ],
      tick: 80100,
    },
    apr: 137.9755133052879,
    apy: 290.3086238666214,
    tier: 2,
    inputAssets: [
      "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
      "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    ],
    outputAssets: ["0xC36442b4a4522E871399CD717aBDD847Ab11FE88"],
    autoWrap: true,
  },
  {
    id: "64ee032e398fb056385a369f",
    name: "Base-UniswapV3-WETH+USDbC-500",
    chainId: 8453,
    address: "0x4C36388bE6F416A29C8d8Eee81C771cE6bE14B18",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 2668490.832062445,
    volumeUSD7D: 27741703.4167794,
    volumeUSD24H: 14510773.12612595,
    meta: {
      toaster: "0x14223fb38d9cc73b5e8daff4b36fd8b1c3ff3658",
      swapRouter: "0x2626664c2603336E57B271c5C0b26F421741e481",
      positionManager: "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1",
      factory: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [994.6779101248422, 511.6724246794122, 254.3267291652609],
      rangeList: [
        [-110, 100],
        [-210, 200],
        [-420, 410],
      ],
      tick: -74020,
    },
    apr: 511.6724246794122,
    apy: 13067.92389818326,
    tier: 1.5,
    inputAssets: [
      "0x4200000000000000000000000000000000000006",
      "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
    ],
    outputAssets: ["0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1"],
    autoWrap: true,
  },
  {
    id: "64ee0317398fb056385a33x0",
    name: "Linea-PancakeswapV3-USDC+WETH-500",
    chainId: 59144,
    address: "0xd5539D0360438a66661148c633A9F0965E482845",
    project: "Pancakeswap V3",
    category: "UniswapV3",
    tvlUSD: 88770,
    volumeUSD7D: 1452451,
    volumeUSD24H: 225070,
    meta: {
      toaster: "0xB8e0CdbaD514Edc1E8e790F4B6f5F613361802a7",
      swapRouter: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
      positionManager: "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364",
      factory: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
      masterChef: "0x22E2f236065B780FA33EC8C4E58b99ebc8B55c57",
      rewardToken: "0x0D1E753a25eBda689453309112904807625bEFBe",
      feeTier: 500,
      tickSpacing: 10,
    },
    dynamicMeta: {
      aprList: [171.71, 85.85, 42.92],
      rangeList: [
        [-150, 150],
        [-300, 300],
        [-600, 600],
      ],
      tick: 202250,
    },
    apr: 85.85,
    apy: 135.72,
    tier: 2,
    inputAssets: [
      "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
      "0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f",
    ],
    outputAssets: ["0x46A15B0b27311cedF172AB29E4f4766fbE7F4364"],
    autoWrap: true,
  },
  {
    id: "64ee0317398fb056385a33x1",
    name: "Linea-PancakeswapV3-USDC+USDT-100",
    chainId: 59144,
    address: "0x6a72F4F191720c411Cd1fF6A5EA8DeDEC3A64771",
    project: "Pancakeswap V3",
    category: "UniswapV3",
    tvlUSD: 159290,
    volumeUSD7D: 1151025,
    volumeUSD24H: 173060,
    meta: {
      toaster: "0xB8e0CdbaD514Edc1E8e790F4B6f5F613361802a7",
      swapRouter: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
      positionManager: "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364",
      factory: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
      masterChef: "0x22E2f236065B780FA33EC8C4E58b99ebc8B55c57",
      rewardToken: "0x0D1E753a25eBda689453309112904807625bEFBe",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [30.14, 15.07, 7.54],
      rangeList: [
        [-2, 2],
        [-4, 4],
        [-6, 6],
      ],
      tick: 2,
    },
    apr: 15.07,
    apy: 16.26,
    tier: 1,
    inputAssets: [
      "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
      "0xa219439258ca9da29e9cc4ce5596924745e12b93",
    ],
    outputAssets: ["0x46A15B0b27311cedF172AB29E4f4766fbE7F4364"],
    autoWrap: true,
  },
  {
    id: "64ee0317398fb056385a33x3",
    name: "GNOSIS-UniswapV3-DAI+USDC-100",
    chainId: 100,
    address: "0xA48E0630B7b9dCb250112143C9D0fe47d26CB1e4",
    project: "Uniswap V3",
    category: "UniswapV3",
    tvlUSD: 37460,
    volumeUSD7D: 435102,
    volumeUSD24H: 62640,
    meta: {
      toaster: "0xa48719d977e5823a7881ba3d7a49b81673adaebb",
      swapRouter: "0xc6d25285d5c5b62b7ca26d6092751a145d50e9be",
      positionManager: "0x7b8a01b39d58278b5de7e48c8449c9f4f5170613",
      factory: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
      rewardToken: "0x0D1E753a25eBda689453309112904807625bEFBe",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [31.78, 15.89, 7.94],
      rangeList: [
        [-2, 2],
        [-4, 4],
        [-6, 6],
      ],
      tick: 276316,
    },
    apr: 15.89,
    apy: 17.22,
    tier: 1,
    inputAssets: [
      "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
      "0x4af15ec2a0bd43db75dd04e62faa3b8ef36b00d5",
    ],
    outputAssets: ["0x46A15B0b27311cedF172AB29E4f4766fbE7F4364"],
    autoWrap: true,
  },
  {
    id: "64ee0317398fb056385a33x3",
    name: "Linea-PancakeswapV3-DAI+USDC-100",
    chainId: 59144,
    address: "0xA48E0630B7b9dCb250112143C9D0fe47d26CB1e4",
    project: "Pancakeswap V3",
    category: "UniswapV3",
    tvlUSD: 37460,
    volumeUSD7D: 435102,
    volumeUSD24H: 62640,
    meta: {
      toaster: "0xB8e0CdbaD514Edc1E8e790F4B6f5F613361802a7",
      swapRouter: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
      positionManager: "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364",
      factory: "0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865",
      masterChef: "0x22E2f236065B780FA33EC8C4E58b99ebc8B55c57",
      rewardToken: "0x0D1E753a25eBda689453309112904807625bEFBe",
      feeTier: 100,
      tickSpacing: 1,
    },
    dynamicMeta: {
      aprList: [31.78, 15.89, 7.94],
      rangeList: [
        [-2, 2],
        [-4, 4],
        [-6, 6],
      ],
      tick: 276316,
    },
    apr: 15.89,
    apy: 17.22,
    tier: 1,
    inputAssets: [
      "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
      "0x4af15ec2a0bd43db75dd04e62faa3b8ef36b00d5",
    ],
    outputAssets: ["0x46A15B0b27311cedF172AB29E4f4766fbE7F4364"],
    autoWrap: true,
  },
];
