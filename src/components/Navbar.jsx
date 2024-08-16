import { Box, Button, Flex, useColorMode, VStack } from "@chakra-ui/react";
import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import React from "react";
import { FaCrown } from "react-icons/fa6";
import { truncateText } from "../lib/utils";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

export default function Navbar() {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useWeb3ModalAccount();
  const { colorMode, toggleColorMode } = useColorMode();

  const getColorModeStyle = (light, dark) =>
    colorMode === "light" ? light : dark;

  return (
    <VStack
      mx="auto"
      my="24px"
      maxW="760px"
      align="flex-start"
      borderWidth="1px"
      borderColor={getColorModeStyle("blackAlpha.200", "whiteAlpha.200")}
      px="16px"
      py="8px"
      rounded="xl"
      // bg="whiteAlpha.200"
      // backdropFilter="blur(3px)"
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
          variant="solid"
          size="md"
          color="white"
          // minW="140px"
          bgGradient="linear(to-br, blue.600, blackAlpha.800)"
          _hover={{
            bgGradient: "linear(to-tl, blue.600, blackAlpha.800)",
          }}
          fontSize={12}
          onClick={() => {
            isConnected ? open({ view: "Account" }) : open({ view: "Connect" });
          }}
        >
          {isConnected ? <>{truncateText(address, 10)}</> : "Connect wallet"}
        </Button>
        <Flex align="center" gap="12px">
          <Button
            align="center"
            gap="12px"
            rounded="full"
            variant="outline"
            color={getColorModeStyle("blackAlpha.800", "whiteAlpha.800")}
            borderColor={getColorModeStyle("blackAlpha.200", "whiteAlpha.200")}
            _hover={{
              bg: getColorModeStyle("blackAlpha.50", "whiteAlpha.50"),
            }}
            fontSize={12}
          >
            <FaCrown color={"#2b6cb0"} size={18} />
            Upgrade to Pro{" "}
          </Button>
          <Box
            cursor="pointer"
            p="8px"
            rounded="full"
            borderWidth="1px"
            borderColor={getColorModeStyle("blackAlpha.200", "whiteAlpha.200")}
            onClick={toggleColorMode}
          >
            {getColorModeStyle(<BsMoonFill />, <BsSunFill />)}
          </Box>
        </Flex>
      </Flex>
    </VStack>
  );
}
