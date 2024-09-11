import React, { use, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Heading,
  Box,
  Text,
  UnorderedList,
  ListItem,
  Flex,
  Divider,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { BiCheck } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { CoinbaseButton } from "./PayButton";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useChargeConnector } from "../hook/chargeConnector";
import { BrowserProvider, ethers } from "ethers";

export default function ProModal({ isOpen, onClose }) {
  const { colorMode } = useColorMode();
  const { address } = useWeb3ModalAccount();
  const [provider, setProvider] = useState(null);
  const { walletProvider } = useWeb3ModalProvider();
  const toast = useToast();

  // const { createCharge, hostedUrl } = useChargeConnector();

  // useEffect(() => {
  //   const fetchChargeData = async () => {
  //     const chargeData = await createCharge();

  //   };

  //   fetchChargeData();
  // }, []);

  // useEffect(() => {
  //   if (window.ethereum) {
  //     // Correctly get Web3Provider from ethers.providers
  //     const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  //     setProvider(web3Provider);
  //   }
  // }, []);

  async function onSignMessage() {
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const tx = {
      from: address,
      to: "0x32530f32931fEB35Edac8EbB897E81DEa93ce074", // Replace with your dedicated wallet address
      value: "2120000000000000", // Amount in ETH (convert from string)
    };
    // const signature = await signer?.signMessage('Hello AppKit Ethers')
    // console.log(signature)
    try {
      const txResponse = await signer?.sendTransaction(tx);
      console.log("Transaction sent:", txResponse);
      // Wait for transaction confirmation
      const receipt = await txResponse.wait();
      console.log("Transaction confirmed:", receipt);
      toast({
        title: "Success",
        description: (
          <a
            href={`https://optimistic.etherscan.io/tx/${receipt.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Optimism Etherscan
          </a>
        ),
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      toast({
        title: "Error",
        description: (`${error.message}`),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const getColorModeStyle = (light, dark) =>
    colorMode === "light" ? light : dark;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          maxW="380px"
          py="24px"
          px="12px"
          bg={getColorModeStyle("white", "#17171D")}
        >
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <VStack w="full" align="left" gap="12px">
              <Box
                w="fit-content"
                px="18px"
                py="8px"
                fontWeight={700}
                letterSpacing={1}
                rounded="xl"
                bg="blue.600"
                color={getColorModeStyle("whiteAlpha.800", "whiteAlpha.800")}
              >
                PRO
              </Box>
              <Text
                fontSize="14px"
                color={getColorModeStyle("blackAlpha.600", "whiteAlpha.600")}
              >
                Get Our Advanced Features with Several Premium plan
              </Text>
              <Text
                mt="18px"
                color={getColorModeStyle("blue.600", "white")}
                fontSize="20px"
                fontWeight={600}
              >
                $0 for 3 Prompts, <br />
                $2.99 per Month
              </Text>
              <Divider w="full" />
              <UnorderedList
                listStyleType="none"
                fontSize={14}
                spacing="10px"
                w="full"
                m="0"
              >
                <ListItem>
                  {" "}
                  <Flex align="center" gap="10px">
                    <BiCheck size={20} /> Priority access to new features
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" gap="10px">
                    <BiCheck size={20} /> Experience a 1 million token context
                    window
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" gap="10px">
                    <BiCheck size={20} /> 2 TB of storage
                  </Flex>
                </ListItem>
                <ListItem>
                  <Flex align="center" gap="10px">
                    <BiCheck size={20} /> Unlimited Prompts
                  </Flex>
                </ListItem>
              </UnorderedList>
              <Divider w="full" />
              <Flex w="full" align="center" justify="center" gap="16px">
                <Button
                  rounded="lg"
                  size="md"
                  color="white"
                  bgGradient="linear(to-br, blue.600, blackAlpha.800)"
                  w="full"
                  alignSelf="flex-end"
                  _hover={{
                    bgGradient: "linear(to-tl, blue.600, blackAlpha.800)",
                  }}
                  onClick={() => onSignMessage()}
                  // disabled={!hostedUrl}
                >
                  Upgrade
                </Button>
                <Button variant="outline" onClick={onClose}>
                  <BsXLg size={20} />
                </Button>
              </Flex>

              {/* <CoinbaseButton destinationWalletAddress={address} /> */}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
