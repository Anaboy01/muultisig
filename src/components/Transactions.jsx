import { Text } from "@radix-ui/themes"
import TransactionCard from "./TransactionCard"




const transactions =[
    {
        id: 1,
        amount: 40,
        reciever: "Anate",
        signersCount:3,
        isExecuted: true,
        txCreator: "Boys",

    },
    {
        id: 2,
        amount: 40,
        reciever: "Ibrahim",
        signersCount:3,
        isExecuted: false,
        txCreator: "Boys",

    },
    {
        id: 3,
        amount: 40,
        reciever: "Anate",
        signersCount:3,
        isExecuted: true,
        txCreator: "Boys",

    },
    {
        id: 4,
        amount: 40,
        reciever: "Mathew",
        signersCount:3,
        isExecuted: false,
        txCreator: "Boys",

    },
   
]

const Transactions = () => {
  return (
    <div className="w-full flex flex-col gap-4">
            <Text as="h1" className="text-3xl font-semibold text-[#e5e5e6ff]">Transaction List</Text>
            <section className="w-full grid lg:grid-cols-3 md:grid-cols-2 md:gap-6 gap-4">
                {
                    transactions.length === 0 ?
                        <Text as="h1" className="text-2xl font-medium text-stone-200">There are no available transactions</Text> :
                        transactions.map((transaction, index) => (<TransactionCard key={index} transaction={transaction} index={index} />))
                }
            </section>
        </div>
  )
}

export default Transactions
