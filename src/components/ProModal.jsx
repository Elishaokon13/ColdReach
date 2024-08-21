import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { BiCheck } from "react-icons/bi";
import { BsXLg } from "react-icons/bs";
import { CoinbaseButton } from "./PayButton";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useChargeConnector } from "../hook/chargeConnector";

export default function ProModal({ isOpen, onClose }) {
  const { colorMode } = useColorMode();
  const { address } = useWeb3ModalAccount();

  const { createCharge, hostedUrl } = useChargeConnector();

  useEffect(() => {
    const fetchChargeData = async () => {
      const chargeData = await createCharge();
     
    };

    fetchChargeData();
  }, []);

  const handleClick = () => {
    if (hostedUrl) {
      window.location.href = hostedUrl;
    }
  };

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
                  onClick={handleClick}
                  disabled={!hostedUrl}
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
