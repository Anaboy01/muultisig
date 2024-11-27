import { AlertDialog, Box, Button, Card, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes"

const Signers = ({signer, index}) => {
    console.log(signer)
    
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

       

        <Button color="red" >Remove</Button>
        </Flex>
        

    </Card>
    </Box>
  )
}

export default Signers
