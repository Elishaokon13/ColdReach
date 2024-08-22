import { Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useBecomeProMutation } from "../src/services/route";
import { useDispatch, useSelector } from "react-redux";

export default function callback() {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserDetails = localStorage.getItem("userDetails");
      if (storedUserDetails) {
        setUserDetails(JSON.parse(storedUserDetails));
      }
    }
  }, []);
  const token = `${userDetails?.accessToken}`;
  //   console.log(token);

  const router = useRouter();
  const [becomePro] = useBecomeProMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCallback = async () => {
      if (!router.isReady || !token) return;
      const status = router.query.status;

      if (status) {
        localStorage.setItem("paymentSuccessful", status);
        try {
          const res = await becomePro({ body: {}, token }).unwrap();
          console.log(res.data);
          dispatch(setUser(res.data));

          localStorage.removeItem("paymentSuccessful");
          router.push("/");
        } catch (error) {
          console.error("Error updating pro status:", error);
        }
      } else {
        console.log("No status found in URL");
      }
    };

    getCallback();
  }, [router.isReady, router.query, token, becomePro, dispatch]);

  return (
    <VStack h="100vh" justify="center">
      <Spinner size="lg" />
      <Text>Redirecting</Text>
    </VStack>
  );
}
