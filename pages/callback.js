import { Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function callback() {
  const router = useRouter();

  useEffect(() => {
    const getCallback = async () => {
      // Wait for the router to be ready
      if (!router.isReady) return;

      const status = router.query.status;
      if (status) {
        console.log("Payment status:", status);
        localStorage.setItem("paymentSuccessful", status);
        router.push("/");
      } else {
        console.log("No status found in URL");
      }
    };

    getCallback();
  }, [router.isReady, router.query]);

  return (
    <VStack h="100vh" justify="center">
      <Spinner size="lg" />
      <Text>Redirecting</Text>
    </VStack>
  );
}
