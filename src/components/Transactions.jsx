import { Text, Button } from "@radix-ui/themes";
import TransactionCard from "./TransactionCard";
import { useMultisig } from "../context/MultisigContext";
import { useState } from "react";

const Transactions = () => {
    const { transactions } = useMultisig();
    const [filter, setFilter] = useState("all");

  
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

  
    const filteredTransactions = transactions.filter((transaction) => {
        if (filter === "executed") {
            return transaction.isExecuted === true;
        } else if (filter === "non-executed") {
            return transaction.isExecuted === false;
        }
        return true; 
    });

    return (
        <div className="w-full flex flex-col gap-4">
            <Text as="h1" className="text-3xl font-semibold text-[#e5e5e6ff]">
                Transaction List
            </Text>
          
            <div className="flex gap-4">
                <Button
                    onClick={() => handleFilterChange("all")}
                    variant={filter === "all" ? "solid" : "outline"}
                    color="gold"
                >
                    All Transactions
                </Button>
                <Button
                    onClick={() => handleFilterChange("executed")}
                    variant={filter === "executed" ? "solid" : "outline"}
                    color="gold"
                >
                    Executed Transactions
                </Button>
                <Button
                    onClick={() => handleFilterChange("non-executed")}
                    variant={filter === "non-executed" ? "solid" : "outline"}
                    color="gold"
                >
                    Non-Executed Transactions
                </Button>
            </div>

            <section className="w-full grid lg:grid-cols-3 md:grid-cols-2 md:gap-6 gap-4">
                {
                    filteredTransactions.length === 0 ? (
                        <Text as="h1" className="text-2xl font-medium text-stone-200">
                            There are no available transactions
                        </Text>
                    ) : (
                        filteredTransactions.map((transaction, index) => (
                            <TransactionCard key={index} transaction={transaction} index={index} />
                        ))
                    )
                }
            </section>
        </div>
    );
};

export default Transactions;
