import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

export default function Layouts({ navbar = true, footer, children }) {
  return (
    <>
      <Box mx="auto" maxW="1340px" px={{ base: "4", md: "8", lg: "24" }}>
        {navbar && <Navbar />}
        {children}
        {/* {footer && } */}
      </Box>
    </>
  );
}
