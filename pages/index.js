import Image from "next/image";
import copy from "copy-to-clipboard";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { truncateText } from "../src/lib/utils";

const Home = () => {
  const copyToClipboard = () => {
    copy(apiOutput);
    alert(`You have copied "${apiOutput}"`);
  };

  const [reasonInput, setReasonInput] = useState("");
  const [personInput, setPersonInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const toast = useToast();

  const handleVStackClick = () => {
    setTextAreaValue(
      "Write a blog post to explain the importance of investment."
    );
    // setTextAreaValue === reasonInput;
  };

  const callGenerateEndpoint = async () => {
    try {
      setIsGenerating(true);

      // console.log("Calling OpenAI...");
      const response = await fetch(
        "https://gpt-writer-api.vercel.app/api/prompt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ personInput, reasonInput }),
        }
      );

      const res = await response.json();
      const { data } = res;
      // console.log("OpenAI replied...", data.text);

      setApiOutput((prevOutput) => [
        ...(Array.isArray(prevOutput) ? prevOutput : []),
        data.text,
      ]);
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
          minH="80vh"
          mx="auto"
          gap="6"
        >
          <VStack align="left">
            <Heading fontWeight={600}>
              Hi there,{" "}
              <Box as="span">
                {" "}
                {address ? truncateText(address, 6) : "New User"}
              </Box>
            </Heading>
            <Text fontSize={16} maxW="460px" color="blackAlpha.600">
              You're finally here, use one of our common prompts below or use
              your own to begin{" "}
            </Text>
          </VStack>
          {apiOutput < 1 && (
            <SimpleGrid columns={[2, 2, 4, 4]} spacing="12px" w="fit-content">
              <VStack
                align="left"
                p="16px"
                justify="space-between"
                h="160px"
                maxW="200px"
                borderWidth={1}
                borderColor="blackAlpha.200"
                rounded="8px"
                _hover={{ bg: "blackAlpha.50", cursor: "pointer" }}
                onClick={handleVStackClick}
              >
                <Text fontSize={12} fontWeight={400}>
                  Write a blog post to explain the importance of investment.
                </Text>
                <BiLoader />
              </VStack>
              <VStack
                align="left"
                p="16px"
                justify="space-between"
                h="160px"
                maxW="200px"
                borderWidth={1}
                borderColor="blackAlpha.200"
                rounded="8px"
                _hover={{ bg: "blackAlpha.50", cursor: "pointer" }}
                onClick={handleVStackClick}
              >
                <Text fontSize={12} fontWeight={400}>
                  Write a blog post to explain the importance of investment.
                </Text>
                <BiLoader />
              </VStack>
              <VStack
                align="left"
                p="16px"
                justify="space-between"
                h="160px"
                maxW="200px"
                borderWidth={1}
                borderColor="blackAlpha.200"
                rounded="8px"
                _hover={{ bg: "blackAlpha.50", cursor: "pointer" }}
                onClick={handleVStackClick}
              >
                <Text fontSize={12} fontWeight={400}>
                  Write a blog post to explain the importance of investment.
                </Text>
                <BiLoader />
              </VStack>
              <VStack
                align="left"
                p="16px"
                justify="space-between"
                h="160px"
                maxW="200px"
                borderWidth={1}
                borderColor="blackAlpha.200"
                rounded="8px"
                _hover={{ bg: "blackAlpha.50", cursor: "pointer" }}
                onClick={handleVStackClick}
              >
                <Text fontSize={12} fontWeight={400}>
                  Write a blog post to explain the importance of investment.
                </Text>
                <BiLoader />
              </VStack>
            </SimpleGrid>
          )}
          <VStack align="left" gap="16px">
            {apiOutput && (
              <>
                {apiOutput?.map((output, index) => (
                  <Box
                    key={index}
                    w="full"
                    bg="blackAlpha.100"
                    p="16px"
                    rounded="lg"
                  >
                    <Text dangerouslySetInnerHTML={{ __html: output }}></Text>
                  </Box>
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
              _placeholder={{ color: "blackAlpha.400" }}
              borderColor="blackAlpha.200"
              value={personInput}
              onChange={onUserChangePerson}
            />
            <Textarea
              placeholder="Write a prompt here..."
              _placeholder={{ color: "blackAlpha.400" }}
              borderColor="blackAlpha.200"
              rows={5}
              value={reasonInput}
              onChange={onUserChangedText}
            />
            {address ? (
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
                <w3m-button balance={false} />
              </Flex>
            )}
          </VStack>
        </VStack>
      </Layouts>
    </>
  );
};

export default Home;
