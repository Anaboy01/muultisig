import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";




const useNewOwner = () => {
    const contract = useContractInstance(true);
    const { address } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();
  
    return useCallback(
      async (newOwner) => {
        if ( !newOwner) {
          toast.error("Receiver and amount are required");
          return;
        }
  
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
          const estimatedGas = await contract.transferOwnership.estimateGas(
            newOwner
          );
          const tx = await contract.transferOwnership(newOwner, {
            gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
          });
  
          const receipt = await tx.wait();
        
  
          if (receipt.status === 1) {
            toast.success("New Owner assigned successfully");
            return;
          }
  
          toast.error("Failed to assign new");
          return;
        } catch (error) {
          const errorDecoder = ErrorDecoder.create();
          const { reason } = await errorDecoder.decode(error);
          toast.error(reason);
        }
      },
      [contract, address, chainId]
    );
}

export default useNewOwner
