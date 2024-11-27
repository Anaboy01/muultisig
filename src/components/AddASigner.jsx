import { Dialog, Button, Flex, Text, TextField, TextArea } from "@radix-ui/themes"
import { useState } from "react"

const AddASigner = () => {
  return (
    <div className="w-full flex justify-end gap-2">
<Dialog.Root>
        <Dialog.Trigger>
            <Button color="#0a2e3dff" >Transfer Ownership</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Transfer your ownership</Dialog.Title>
        

        <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                               New Owner
                            </Text>
                            <TextField.Root
                                placeholder="Enter Adress"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button >Transfer</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
<Dialog.Root>
        <Dialog.Trigger>
            <Button color="#0a2e3dff" >Add Signer</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Add a signer</Dialog.Title>
        

        <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                               Signer Address
                            </Text>
                            <TextField.Root
                                placeholder="Enter Adress"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button >Add</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
      
    </div>
  )
}

export default AddASigner
