import { ethers } from 'ethers'

const useContract = () => {
  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
    return contract
  }

  return { getContract }
}

export default useContract

const CONTRACT_ADDRESS = 'dd'
const CONTRACT_ABI: any = [
  
]
