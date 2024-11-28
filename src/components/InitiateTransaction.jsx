import {
  Dialog,
  Button,
  Flex,
  Text,
  TextField,
  TextArea,
} from "@radix-ui/themes";
import { useState } from "react";
import useInitiateTransaction from "../hooks/useInitiateTransaction";

const InitiateTransaction = () => {
    const handleInitiateTxn = useInitiateTransaction()

    const [fields, setFields] = useState({
        amount: "",
        receiver: "",
    })

    const handleChange = (name, e) => {
        setFields((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const { amount, receiver } = fields;

    const handleSubmit = () => {
        handleInitiateTxn(amount, receiver);
        setFields({ amount: "", receiver: "" });
    }
  return (
    <div className="w-full flex justify-end">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button color="#0a2e3dff">Intiate Transaction</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Initiate a transaction</Dialog.Title>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Amount
              </Text>
              <TextField.Root placeholder="Enter Amount"  value={amount} onChange={(e) => handleChange("amount", e)}/>
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Reciever
              </Text>
              <TextArea placeholder="Enter Reciever Address"  value={receiver} onChange={(e) => handleChange("receiver", e)}/>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={handleSubmit}>Initiate</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default InitiateTransaction;
