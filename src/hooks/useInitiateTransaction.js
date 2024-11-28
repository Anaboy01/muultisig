import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";
import { ethers } from "ethers";

const useInitiateTransaction = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (amount, receiver) => {
      if (!amount || !receiver) {
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

      const amountInWei = ethers.parseEther(amount);
      console.log(amountInWei);

      try {
        const estimatedGas = await contract.initiateTransaction.estimateGas(
          amountInWei,
          receiver
        );
        const tx = await contract.initiateTransaction(amountInWei, receiver, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });

        const receipt = await tx.wait();
       

        if (receipt.status === 1) {
          toast.success("Transaction Initiated Successfully successfully");
          return;
        }

        toast.error("Failed to initiate transaction");
        return;
      } catch (error) {
        const errorDecoder = ErrorDecoder.create();
        const { reason } = await errorDecoder.decode(error);
        toast.error(reason);
      }
    },
    [contract, address, chainId]
  );
};

export default useInitiateTransaction;
