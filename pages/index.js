import React, { useEffect, useState } from "react";
import Typical from "react-typical";
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
import Layouts from "../src/components/layouts";
import { truncateText } from "../src/lib/utils";
import { IoCopyOutline } from "react-icons/io5";
import { PiShareFatLight } from "react-icons/pi";
import { Prompts } from "../src/data";
// import useSubmitAddress from "../src/hook/submitAddress";
import { BsExclamationCircle } from "react-icons/bs";
import {
  useAuthenticateMutation,
  usePromptMutation,
} from "../src/services/route";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage, setUser } from "../src/services/redux";

function Home() {
  const user = useSelector((state) => state.user.user);
  const token = user?.accessToken;

  const dispatch = useDispatch();
  useEffect(() => {
    // Load the user from localStorage on client-side only
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  const [reasonInput, setReasonInput] = useState("");
  const [personInput, setPersonInput] = useState("");
  const [apiOutput, setApiOutput] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [authenticate] = useAuthenticateMutation();
  const [prompt, { isLoading, error }] = usePromptMutation();

  const { address, isConnected } = useWeb3ModalAccount();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handlePromptClick = (prompt) => {
    setPersonInput(prompt.person);
    setReasonInput(prompt.prompt);
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // useSubmitAddress(isConnected, address, API_URL);

  useEffect(() => {
    const submitAddress = async () => {
      try {
        const data = { address };
        // console.log(data);
        const res = await authenticate(data).unwrap();
        dispatch(setUser(res.data));
      } catch (error) {
        console.error("Error in submitAddress:", error);
      }
    };
    if (isConnected) {
      submitAddress();
    }
  }, [isConnected]);

  const callGenerateEndpoint = async () => {
    try {
      const data = { personInput, reasonInput };
      const res = await prompt({ data, token }).unwrap();
      console.log(res);
      // setIsGenerating(true);
      // const response = await fetch(`${API_URL}/prompt`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("JWToken")}`,
      //   },
      //   body: JSON.stringify({ personInput, reasonInput }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   setError(errorData.message || "Network response was not ok");
      //   throw new Error(errorData.message || "Network response was not ok");
      // }

      // const { data } = await response.json();
      setApiOutput((prevOutput) => [
        ...(Array.isArray(prevOutput) ? prevOutput : []),
        res.data.text,
      ]);

      // Start typing effect
      startTypingEffect(res.data.text);

      setPersonInput("");
      setReasonInput("");
      // setIsGenerating(false);
    } catch (error) {
      setErrorMessage(error.data.message || "Network response was not ok");
      console.error("Error in callGenerateEndpoint:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate response",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // setIsGenerating(false);
    }
  };

  const startTypingEffect = (text) => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index += 1;
      if (index > text.length) clearInterval(interval);
    }, 50); // Adjust typing speed by changing the interval delay
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "person") setPersonInput(value);
    else if (name === "reason") setReasonInput(value);
  };

  const copyToClipboard = () => {
    copy(displayText);
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

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
            <Box as="span" color="blue.600">
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
                _hover={{
                  bg: getColorModeStyle("blackAlpha.50", "whiteAlpha.50"),
                  cursor: "pointer",
                }}
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
              </VStack>
            ))}
          </SimpleGrid>
        )}

        <VStack align="left" gap="16px">
          {displayText && (
            <>
              <VStack
                align="left"
                w="full"
                bg={getColorModeStyle("blackAlpha.100", "whiteAlpha.100")}
                p="16px"
                rounded="lg"
                gap="12px"
                whiteSpace="pre-wrap"
              >
                <Typical steps={[displayText, 600]} loop={1} wrapper="p" />
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
            </>
          )}
          {errorMessage && (
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
              {errorMessage}
            </Flex>
          )}
          {isLoading && (
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
            isLoading={isLoading}
            isDisabled={
              isLoading || !reasonInput || !personInput || !isConnected
            }
            onClick={callGenerateEndpoint}
          >
            {!isConnected ? "Connect Wallet" : "Generate Message"}
          </Button>
        </VStack>
      </VStack>
    </Layouts>
  );
}

export default Home;
