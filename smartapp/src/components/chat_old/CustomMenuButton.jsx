import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

export default function CustomMenuButton({ menuItems }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon
          sx={{
            color: "#afbac0",
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
