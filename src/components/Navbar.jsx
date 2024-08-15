import { Button, Flex, VStack } from "@chakra-ui/react";
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import React from "react";
import { FaCrown } from "react-icons/fa6";
import { truncateText } from "../lib/utils";

export default function Navbar() {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  return (
    <VStack
      mx="auto"
      my="24px"
      maxW="760px"
      align="flex-start"
      borderWidth="1px"
      borderColor="blackAlpha.200"
      px="16px"
      py="8px"
      rounded="lg"
      bg="whiteAlpha.200"
      backdropFilter="blur(3px)"
      // position="fixed"
      // top="10"
      // left="50%"
      // transform="translateX(-50%)"
      // zIndex="1000"
    >
      <Flex align="center" justify="space-between" w="100%">
        {/* <w3m-button balance="hide" /> */}
        <Button
          align="center"
          gap="12px"
          rounded="full"
          variant="outline"
          size="md"
          color="white"
          minW="140px"
          bgGradient="linear(to-br, pink.500, blackAlpha.800)"
          _hover={{
            bgGradient: "linear(to-tl, pink.500, blackAlpha.800)",
          }}
          fontSize={12}
          onClick={() => {
            isConnected ? open({ view: "Account" }) : open({ view: "Connect" });
          }}
        >
          {isConnected ? <>{truncateText(address, 10)}</> : "Connect wallet"}
        </Button>
        <Button
          align="center"
          gap="12px"
          rounded="full"
          variant="outline"
          color="blackAlpha.800"
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
