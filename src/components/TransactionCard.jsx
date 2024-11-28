import { AlertDialog, Box, Button, Card, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes"
import { useState } from "react";
import useApproveTxn from "../hooks/useApproveTxn";

const TransactionCard = ({transaction, index}) => {
    const handleApprovetxn = useApproveTxn()
 const {id, amount, signersCount, receiver, isExecuted, txCreator } = transaction;


  const handleApproval = (value) => {
    const id = Number(value);
    handleApprovetxn(id);
}
  return (
    
    <div>
      
        <Box className="w-full">
            <Card variant="surface"  >
                <Flex direction={"column"} gap={6}>
                    <h2 className="text-[#0cc2ff] mb-3">#{id}</h2>
                    <Text as="div" size="2" weight="bold">
                        Amount
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {amount} 
                    </Text>
                    <Text as="div" size="2" weight="bold">
                        Reciever
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {receiver}
                    </Text>
                    <Text as="div" size="2" weight="bold">
                        Number of Approval
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {signersCount} Approvals
                    </Text>
                    <Text as="div" size="2" weight="bold">
                        Created by
                    </Text>
                    <Text as="div" color="gray" size="2">
                        {txCreator} 
                    </Text>
                    
                </Flex>
                {isExecuted == true ?
                <Button disabled color="bronze">Executed</Button>:
                <Button color="gold" onClick={() => handleApproval(id)} variant="solid">Approve</Button>
            }

               
            </Card>
        </Box>

    
    </div>
  )
}

export default TransactionCard
