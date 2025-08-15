import { Box } from "@mui/material";
import React from "react";

export default function CustomAppBar({ children }) {
  return (
    <Box
      height="63px"
      sx={{
        background: "#FFFFFF",
        padding: "0px 20px",
      }}
    >
      {children}
    </Box>
  );
}
