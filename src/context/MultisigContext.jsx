import { createContext, useCallback, useContext, useEffect, useState } from "react";
import useContractInstance from "../hooks/useContractInstance";
import { Contract, ethers } from "ethers";
import ABI from "../ABI/multisig.json";
import useSignerOrProvider from "../hooks/useSignerOrProvider";


const MultiSigContext = createContext({
    transactions: [],
    signers: []
})


export const MultisigContextProvider = ({children})=>{
    const [transactions, setTransactions] = useState([]);
    const [signers, setSigners] = useState([]);
    const readOnlyMulisigContract = useContractInstance();
    const { readOnlyProvider } = useSignerOrProvider();

    const getTransactions = useCallback(async () => {
        if (!readOnlyMulisigContract) return;

        try {
            const data = await readOnlyMulisigContract.getAllTransactions();
            const formattedTns = data.map((transaction) => ({
                id: transaction.id.toString(),
                amount:  ethers.formatEther(transaction.amount).toString(),
                receiver: transaction.receiver,
                signersCount: transaction.signersCount.toString(),
                isExecuted: transaction.isExecuted,
                txCreator: transaction.txCreator
            }))

            setTransactions(formattedTns);
        } catch (error) {
            console.log("Error fetching transactions", error);
        }
    }, [readOnlyMulisigContract])

    useEffect(() => {
        getTransactions();
    }, [getTransactions])

    const transactionApprovalHandler = useCallback((id, approver, signersCount) => {
        setTransactions((prevState) => {
            const updatedTransactions = prevState.map((txn) =>
                txn.id === id ? { ...txn, signersCount } : txn
            );
            return updatedTransactions;
        });
    }, []);
    
    useEffect(() => {
        const contract = new Contract(
            import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS,
            ABI,
            readOnlyProvider
        );
    
        contract.on("TransactionApproved", transactionApprovalHandler);
    
        return () => {
            contract.off("TransactionApproved", transactionApprovalHandler);
        };
    }, [transactionApprovalHandler, readOnlyProvider]);

    
    const transactionExecutionHandler = useCallback((id, receiver, amount) => {
        setTransactions((prevState) => {
            const updatedTransactions = prevState.map((txn) =>
                txn.id === id ? { ...txn, isExecuted: true } : txn
            );
            return updatedTransactions;
        });
    }, []);
    
    useEffect(() => {
        const contract = new Contract(
            import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS,
            ABI,
            readOnlyProvider
        );
    
        contract.on("TransactionExecuted", transactionExecutionHandler);
    
        return () => {
            contract.off("TransactionExecuted", transactionExecutionHandler);
        };
    }, [transactionExecutionHandler, readOnlyProvider]);
    

    const getSigners = useCallback(async () => {
        if (!readOnlyMulisigContract) return;

        try {
            const data = await readOnlyMulisigContract.getSigners();
            const formattedSigners = data.map((signer) => (signer))

            setSigners(formattedSigners);
        } catch (error) {
            console.log("Error fetching signers", error);
        }
    }, [readOnlyMulisigContract])

    useEffect(() => {
        getSigners();
    }, [getSigners])

    const signerDeleteHandler = useCallback((index) => {
        setSigners((prevState) => {
            const updatedSigners = [...prevState];
            updatedSigners.splice(Number(index), 1);
            return updatedSigners;
        });
    }, [])

    useEffect(() => {
        const contract = new Contract(
            import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS,
            ABI,
            readOnlyProvider
        );
        contract.on("SignerRemoved", signerDeleteHandler);
        return () => {
            contract.off("SignerRemoved", signerDeleteHandler);
        }
    }, [signerDeleteHandler, readOnlyProvider])


    return (<MultiSigContext.Provider value={{transactions, signers}}>
        {children}
    </MultiSigContext.Provider>)
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMultisig = () => {
    const context = useContext(MultiSigContext);
    return context;
}