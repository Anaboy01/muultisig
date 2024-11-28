import {
    Button,
    Flex,
    Text,
    Card
  } from "@radix-ui/themes";
  import { useState } from "react";
  import useNewClaimOwnerShip from "../hooks/useNewClaimOwnerShip";
  import { useNavigate } from "react-router-dom";
  
  const NewOwnerPage = () => {
    const handleClaim = useNewClaimOwnerShip();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
  
    const handleClaimOwnership = async () => {
      try {
        setIsLoading(true);
        const success = await handleClaim();
        if (success) {
          navigate("/ownerPage"); 
        }
      } catch (error) {
        console.error("Error claiming ownership:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="w-full h-[70vh] flex justify-center items-center gap-2">
        <Card className="w-[450px] items-center">
          <Flex direction={"column"} gap={"4"}>
            <Text as="div" size="3" weight="bold" className="text-center text-[#0cc2ff]">
              Hello! You have been assigned the ownership of this platform.
            </Text>
            <Text as="div" size="1" weight="light" className="text-center">
              If you wish to continue, please click the button below.
            </Text>
            <Button onClick={handleClaimOwnership} disabled={isLoading}>
              {isLoading ? "Processing..." : "Claim Ownership"}
            </Button>
          </Flex>
        </Card>
      </div>
    );
  };
  
  export default NewOwnerPage;
  