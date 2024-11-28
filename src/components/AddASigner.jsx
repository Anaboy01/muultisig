import {
  Dialog,
  Button,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";
import useAddSigner from "../hooks/useAddSigner";
import useNewOwner from "../hooks/useNewOwner";

const AddASigner = () => {
  const handleAddNewSigner = useAddSigner();
  const handleTransferOwnership = useNewOwner();
  const [signer, setSigner] = useState("");
  const [newOwner, setNewOwner] = useState("");

  const handleChange = (e) => {
    setSigner(e.target.value); // Directly set the string value
  };

  const handleNewOwnerChange = (e)=> {
    setNewOwner(e.target.value)
  }

  const handleSubmit = () => {
    handleAddNewSigner(signer);
    setSigner("");
  };

  const handleOwnershipTransfer = () => {
    handleTransferOwnership(newOwner)
    setNewOwner("")
  }
  return (
    <div className="w-full flex justify-end gap-2">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="#0a2e3dff">Transfer Ownership</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Transfer your ownership</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                New Owner
              </Text>
              <TextField.Root placeholder="Enter Adress" value={newOwner} onChange={(e)=> handleNewOwnerChange(e)} />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleOwnershipTransfer}>Transfer</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="#0a2e3dff">Add Signer</Button>
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
                value={signer}
                onChange={(e) => handleChange(e)}
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
              <Button onClick={handleSubmit}>Add</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default AddASigner;
