import Image from "next/image";
import copy from "copy-to-clipboard";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useCallback, useState } from "react";
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
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { truncateText } from "../src/lib/utils";
import { IoCopyOutline } from "react-icons/io5";
import { PiShareFatLight } from "react-icons/pi";
import { Prompts } from "../src/data";

const Home = () => {
  const [reasonInput, setReasonInput] = useState("");
  const [personInput, setPersonInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handlePromptClick = (prompt) => {
    setPersonInput(prompt.person);
    setReasonInput(prompt.prompt);
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const callGenerateEndpoint = async () => {
    try {
      setIsGenerating(true);

      // console.log("Calling OpenAI...");
      const response = await fetch(`${API_URL}/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ personInput, reasonInput }),
      });

      const res = await response.json();
      const { data } = res;
      // console.log("OpenAI replied...", data.text);

      setApiOutput((prevOutput) => [
        ...(Array.isArray(prevOutput) ? prevOutput : []),
        data.text,
      ]);
      setPersonInput("");
      setReasonInput("");
      setIsGenerating(true);
    } catch (error) {
      console.error("Error in callGenerateEndpoint:", error);
      toast({
        title: "Error",
        description: "Failed to generate response",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // Handle the error accordingly, e.g., show a message to the user
    } finally {
      setIsGenerating(false);
    }
  };

  const onUserChangedText = (event) => {
    setReasonInput(event.target.value);
  };
  const onUserChangePerson = (event) => {
    setPersonInput(event.target.value);
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

  return (
    <>
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
                bgGradient="linear(to-br, pink.500, blackAlpha.800)"
                bgClip="text"
              >
                {" "}
                {address ? truncateText(address, 6) : "New User"}
              </Box>
            </Heading>
            <Text
              fontSize={16}
              maxW="460px"
              color={
                colorMode === "light" ? "blackAlpha.600" : "whiteAlpha.600"
              }
            >
              You're finally here, use one of our common prompts below or use
              your own to begin{" "}
            </Text>
          </VStack>
          {apiOutput < 1 && (
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
                  borderColor={
                    colorMode === "light" ? "blackAlpha.400" : "whiteAlpha.400"
                  }
                  rounded="8px"
                  _hover={{ bg: "blackAlpha.50", cursor: "pointer" }}
                  onClick={() => handlePromptClick(prompt)}
                >
                  <VStack align="left" gap="2">
                    <Text
                      fontSize={11}
                      color={
                        colorMode === "light"
                          ? "blackAlpha.700"
                          : "whiteAlpha.600"
                      }
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
                {apiOutput?.map((output, index) => (
                  <VStack
                    key={index}
                    align="left"
                    w="full"
                    bg={
                      colorMode === "light"
                        ? "blackAlpha.100"
                        : "whiteAlpha.100"
                    }
                    p="16px"
                    rounded="lg"
                    gap="12px"
                  >
                    <Text dangerouslySetInnerHTML={{ __html: output }}></Text>
                    <Flex align="center" gap="12px">
                      <Box cursor="pointer" onClick={copyToClipboard}>
                        <IoCopyOutline />
                      </Box>
                      <Box cursor="pointer">
                        <PiShareFatLight />
                      </Box>
                    </Flex>
                    {/* <Text>{output}</Text> */}
                  </VStack>
                ))}
              </>
            )}
            {isGenerating && (
              <Box>
                <Spinner colorScheme="green" />
              </Box>
            )}
          </VStack>
          <VStack
            align="left"
            w="full"
            // position="fixed"
            // bottom="10"
            // left="50%"
            // transform="translateX(-50%)"
            // zIndex="1000"
          >
            <Input
              placeholder="Input person's description"
              _placeholder={{
                color:
                  colorMode === "light" ? "blackAlpha.400" : "whiteAlpha.400",
              }}
              borderColor={
                colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"
              }
              value={personInput}
              onChange={(e) => setPersonInput(e.target.value)}
            />
            <Textarea
              placeholder="Write a prompt here..."
              _placeholder={{
                color:
                  colorMode === "light" ? "blackAlpha.400" : "whiteAlpha.400",
              }}
              borderColor={
                colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200"
              }
              rows={5}
              value={reasonInput}
              onChange={(e) => setReasonInput(e.target.value)}
            />
            {isConnected ? (
              <Button
                rounded="lg"
                size="md"
                color="white"
                bgGradient="linear(to-br, pink.500, blackAlpha.800)"
                minW="160px"
                alignSelf="flex-end"
                _hover={{
                  bgGradient: "linear(to-tl, pink.500, blackAlpha.800)",
                }}
                isLoading={isGenerating}
                isDisabled={isGenerating || !reasonInput || !personInput}
                onClick={callGenerateEndpoint}
              >
                Generate message
              </Button>
            ) : (
              <Flex alignSelf="end">
                <Button
                  align="center"
                  gap="12px"
                  rounded="full"
                  variant="solid"
                  size="md"
                  color="white"
                  minW="140px"
                  bgGradient="linear(to-br, pink.500, blackAlpha.800)"
                  _hover={{
                    bgGradient: "linear(to-tl, pink.500, blackAlpha.800)",
                  }}
                  fontSize={12}
                  onClick={() => {
                    open({ view: "Connect" });
                  }}
                >
                  Connect wallet
                </Button>
              </Flex>
            )}
          </VStack>
        </VStack>
      </Layouts>
    </>
  );
};

export default Home;
