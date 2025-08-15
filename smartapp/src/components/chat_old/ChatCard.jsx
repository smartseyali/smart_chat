import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

export default function ChatCard({ item }) {
  const { name, lastSeen, lastText, selected } = item;
  return (
    <Box
      display="flex"
      sx={{
        background: selected ? "#f4f4eeff" : "#FFFFFF",
        padding: "8px 12px",
      }}
    >
      <Avatar />
      <Box
        display="flex"
        flexDirection="column"
        pl="15px"
        width="100%"
        alignItems="flex-start"
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="body1" color="black">
            {name}
          </Typography>
          <Typography variant="caption" color="#737475ff">
            {lastSeen}
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="#737475ff" noWrap>
          {lastText}
        </Typography>
      </Box>
    </Box>
  );
}
