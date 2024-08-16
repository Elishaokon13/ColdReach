import Image from "next/image";
import copy from "copy-to-clipboard";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { use, useEffect, useState } from "react";
import Layouts from "../src/components/layouts";
import { BiLoader } from "react-icons/bi";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  useColorMode,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { truncateText } from "../src/lib/utils";
import { IoCopyOutline } from "react-icons/io5";
import { PiShareFatLight } from "react-icons/pi";
import { Prompts } from "../src/data";
import useSubmitAddress from "../src/hook/submitAddress";
import { BsExclamationCircle } from "react-icons/bs";

const Home = () => {
  const [reasonInput, setReasonInput] = useState("");
  const [personInput, setPersonInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const { address, isConnected } = useWeb3ModalAccount();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handlePromptClick = (prompt) => {
    setPersonInput(prompt.person);
    setReasonInput(prompt.prompt);
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useSubmitAddress(isConnected, address, API_URL);

  const callGenerateEndpoint = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch(`${API_URL}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("JWToken")}`,
        },
        body: JSON.stringify({ personInput, reasonInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Network response was not ok");
        throw new Error(errorData.message || "Network response was not ok");
      }

      const { data } = await response.json();
      setApiOutput((prevOutput) => [
        ...(Array.isArray(prevOutput) ? prevOutput : []),
        data.text,
      ]);
      setPersonInput("");
      setReasonInput("");
      setIsGenerating(false);
    } catch (error) {
      console.error("Error in callGenerateEndpoint:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate response",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "person") setPersonInput(value);
    else if (name === "reason") setReasonInput(value);
  };

  const copyToClipboard = () => {
    copy(apiOutput);
    toast({
      title: "Success",
      description: "Copied to clipboard",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const getColorModeStyle = (light, dark) =>
    colorMode === "light" ? light : dark;

  return (
    <Layouts>
      <VStack
        mt="64px"
        mb="32px"
        maxW="760px"
        align="left"
        justify="end"
        w="full"
        minH="60vh"
        mx="auto"
        gap="6"
      >
        <VStack align="left">
          <Heading fontWeight={600}>
            Hi there,{" "}
            <Box
              as="span"
              bgGradient="linear(to-br, blue.600, blackAlpha.800)"
              bgClip="text"
            >
              {address ? truncateText(address, 6) : "New User"}
            </Box>
          </Heading>
          <Text
            fontSize={16}
            maxW="460px"
            color={getColorModeStyle("blackAlpha.600", "whiteAlpha.600")}
          >
            You're finally here, use one of our common prompts below or use your
            own to begin{" "}
          </Text>
        </VStack>

        {apiOutput?.length < 1 && (
          <SimpleGrid columns={[2, 2, 4, 4]} spacing="12px" w="fit-content">
            {Prompts.map((prompt, index) => (
              <VStack
                key={index}
                align="left"
                p="16px"
                justify="space-between"
                h="160px"
                maxW="200px"
                borderWidth={1}
                borderColor={getColorModeStyle(
                  "blackAlpha.400",
                  "whiteAlpha.400"
                )}
                rounded="8px"
                _hover={{ bg: "blackAlpha.50", cursor: "pointer" }}
                onClick={() => handlePromptClick(prompt)}
              >
                <VStack align="left" gap="2">
                  <Text
                    fontSize={11}
                    color={getColorModeStyle(
                      "blackAlpha.700",
                      "whiteAlpha.600"
                    )}
                    fontWeight={400}
                  >
                    {prompt.person}
                  </Text>
                  <Text fontSize={12} fontWeight={400}>
                    {prompt.prompt}
                  </Text>
                </VStack>
                <BiLoader />
              </VStack>
            ))}
          </SimpleGrid>
        )}

        <VStack align="left" gap="16px">
          {apiOutput && (
            <>
              {apiOutput.map((output, index) => (
                <VStack
                  key={index}
                  align="left"
                  w="full"
                  bg={getColorModeStyle("blackAlpha.100", "whiteAlpha.100")}
                  p="16px"
                  rounded="lg"
                  gap="12px"
                  whiteSpace="pre-wrap"
                >
                  <Text>{output}</Text>
                  <Flex align="center" gap="12px">
                    <Box
                      cursor="pointer"
                      onClick={copyToClipboard}
                      aria-label="Copy to clipboard"
                    >
                      <IoCopyOutline />
                    </Box>
                    <Box cursor="pointer" aria-label="Share">
                      <PiShareFatLight />
                    </Box>
                  </Flex>
                </VStack>
              ))}
            </>
          )}
          {error && (
            <Flex
              align="center"
              w="full"
              bg={getColorModeStyle("blackAlpha.100", "whiteAlpha.100")}
              color="red.500"
              p="16px"
              rounded="lg"
              gap="12px"
              whiteSpace="pre-wrap"
            >
              <BsExclamationCircle />
              {error}
            </Flex>
          )}
          {isGenerating && (
            <Box>
              <Spinner colorScheme="green" />
            </Box>
          )}
        </VStack>

        <VStack align="left" w="full">
          <Input
            name="person"
            placeholder="Input person's description"
            _placeholder={{
              color: getColorModeStyle("blackAlpha.400", "whiteAlpha.400"),
            }}
            borderColor={getColorModeStyle("blackAlpha.200", "whiteAlpha.200")}
            value={personInput}
            onChange={handleInputChange}
          />
          <Textarea
            name="reason"
            placeholder="Write a prompt here..."
            _placeholder={{
              color: getColorModeStyle("blackAlpha.400", "whiteAlpha.400"),
            }}
            borderColor={getColorModeStyle("blackAlpha.200", "whiteAlpha.200")}
            rows={5}
            value={reasonInput}
            onChange={handleInputChange}
          />
          <Button
            rounded="lg"
            size="md"
            color="white"
            bgGradient="linear(to-br, blue.600, blackAlpha.800)"
            minW="160px"
            alignSelf="flex-end"
            _hover={{ bgGradient: "linear(to-tl, blue.600, blackAlpha.800)" }}
            isLoading={isGenerating}
            isDisabled={
              isGenerating || !reasonInput || !personInput || !isConnected
            }
            onClick={callGenerateEndpoint}
          >
            Generate message
          </Button>
        </VStack>
      </VStack>
    </Layouts>
  );
};

export default Home;
