import { Dialog, Button, Flex, Text, TextField, TextArea } from "@radix-ui/themes"
import { useState } from "react"

const InitiateTransaction = () => {
  return (
    <div className="w-full flex justify-end">
<Dialog.Root>
        <Dialog.Trigger>
            <Button color="#0a2e3dff" >Intiate Transaction</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Initiate a transaction</Dialog.Title>
        

        <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Amount
                            </Text>
                            <TextField.Root
                                placeholder="Enter Amount"
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Reciever
                            </Text>
                            <TextArea placeholder="Enter Reciever Address"/>
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button >Initiate</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
      
    </div>
  )
}

export default InitiateTransaction
