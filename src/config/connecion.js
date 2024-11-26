import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { baseSepolia, sepolia } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'


const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID

const networks = [baseSepolia, sepolia]

const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
  }


  createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    themeVariables:{
        "--w3m-accent": "#0a2e3dff",
        "--w3m-border-radius-master":"1px",

      },
      features: {
        analytics: true // Optional - defaults to your Cloud configuration
      }
  })