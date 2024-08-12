import { Box } from "@chakra-ui/react";
import React from "react";

export default function Layouts({ navbar, footer, children }) {
  return (
    <>
      {/* {navbar && } */}
      <Box mx="auto" maxW="1340px" px={{ base: "4", md: "8", lg: "24" }}>
        {children}
      </Box>
      {/* {footer && } */}
    </>
  );
}
