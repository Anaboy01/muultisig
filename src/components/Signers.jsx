import { AlertDialog, Box, Button, Card, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes"
import useRemoveSigner from "../hooks/useRemoveSigner";

const Signers = ({signer, index}) => {
    const handleRemoveSigner = useRemoveSigner()
    const handleRemoval = (value) => {
        const index = Number(value);
        handleRemoveSigner(index);
    }
    
  return (
    <Box className="w-full">
    <Card variant="surface"  >
        <Flex direction={"column"} gap={"6"}>
        <Flex direction={"column"} gap={"1"}>
            <Text as="div" size="2" weight="bold">
                Signer Address
            </Text>
            <Text as="div" color="gray" size="2">
                {signer}
            </Text>
        </Flex>

       

        <Button color="red" onClick={() => handleRemoval(index)}>Remove</Button>
        </Flex>
        

    </Card>
    </Box>
  )
}

export default Signers
