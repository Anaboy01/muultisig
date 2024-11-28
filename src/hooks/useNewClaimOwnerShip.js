import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";



const useNewClaimOwnerShip = () => {
    const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();


  return useCallback(
    async () => {
        if (!address) {
            toast.error("Please connect your wallet");
            return;
          }
    
          if (!contract) {
            toast.error("Contract not found");
            return;
          }
    
          if (Number(chainId) !== Number(baseSepolia.id)) {
            toast.error("You're not connected to baseSepolia");
            return;
          }

          try {
            const estimatedGas = await contract.claimOwnership.estimateGas();

            const tx = await contract.claimOwnership( {
                gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
              });
            
              const receipt = await tx.wait();

            if(receipt.status === 1) {
                toast.success("Claim successful");
                return;
            }
            toast.error("Failed to Claim");
            return;
          } catch (error) {
            const errorDecoder = ErrorDecoder.create();
            const decodedError = await errorDecoder.decode(error);
            console.error("Error Claiming", decodedError);
            toast.error(decodedError.reason);
            
          }
    },  [address, contract, chainId]
  )
}

export default useNewClaimOwnerShip
