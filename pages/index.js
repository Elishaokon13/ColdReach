import Image from "next/image";
import copy from "copy-to-clipboard";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";
import Layouts from "../src/components/layouts";
import { BiLoader } from "react-icons/bi";
import {
  Button,
  Heading,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";

const Home = () => {
  const copyToClipboard = () => {
    copy(apiOutput);
    alert(`You have copied "${apiOutput}"`);
  };

  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const toast = useToast();

  const handleVStackClick = () => {
    setTextAreaValue(
      "Write a blog post to explain the importance of investment."
    );
  };

  const callGenerateEndpoint = async () => {
    try {
      setIsGenerating(true);

      console.log("Calling OpenAI...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("OpenAI replied...", data);

      const { output } = data;
      console.log("OpenAI output:", output);

      setApiOutput(output);
    } catch (error) {
      console.error("Error in callGenerateEndpoint:", error);
      toast({
        title: "Error",
        description: "Failed to generate text",
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
    setUserInput(event.target.value);
  };

  return (
    <>
      <Layouts>
        <VStack
          maxW="760px"
          align="left"
          justify="center"
          w="full"
          minH="70vh"
          mx="auto"
          gap="4"
        >
          <VStack align="left">
            <Heading fontWeight={600}>Hi there, John</Heading>
            <Text fontSize={16} maxW="360px" color="blackAlpha.600">
              You're finally here, use one of our common prompts below or use
              your own to begin{" "}
            </Text>
          </VStack>
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
          <VStack align="left" w="full">
            {apiOutput && (
              <VStack align="left">
                <Text fontWeight={700}>Output:</Text>
                <Text>{apiOutput}</Text>
              </VStack>
            )}
            <Textarea
              placeholder="Write your own prompt"
              borderColor="blackAlpha.200"
              rows={3}
              value={userInput || textAreaValue}
              onChange={onUserChangedText}
            />
            <Button
              rounded="lg"
              size="md"
              color="white"
              bgGradient="linear(to-br, blue.500, blue.800)"
              w="fit-content"
              alignSelf="flex-end"
              _hover={{ bg: "blue.800" }}
              isLoading={isGenerating}
              onClick={callGenerateEndpoint}
            >
              Generate
            </Button>
          </VStack>
        </VStack>
      </Layouts>
    </>
  );
};

export default Home;
