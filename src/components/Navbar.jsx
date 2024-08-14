import { Button, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import { FaCrown } from "react-icons/fa6";

export default function Navbar() {
  return (
    <VStack
      mx="auto"
      maxW="460px"
      align="flex-start"
      borderWidth="1px"
      borderColor="blackAlpha.200"
      p="16px"
      rounded="lg"
    >
      <Flex align="center" justify="space-between" w="100%">
        <w3m-button  />
        <Button
          align="center"
          gap="12px"
          rounded="full"
          variant="outline"
          color='blackAlpha.800'
          borderColor="blackAlpha.200"
          _hover={{ bg: "blackAlpha.50" }}
          fontSize={12}
        >
          <FaCrown size={18} />
          Upgrade to Pro{" "}
        </Button>
      </Flex>
    </VStack>
  );
}
