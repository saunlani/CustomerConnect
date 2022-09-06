import { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

interface MenuAppBarProps {
  handleOpenRegisterFormDialog: () => void
}

export const MenuAppBar = ({ handleOpenRegisterFormDialog }: MenuAppBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClickRegister = () => {
    handleOpenRegisterFormDialog()
    setAnchorEl(null)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuClick}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}>
        <MenuItem onClick={handleClickRegister}>Create a Customer</MenuItem>
      </Menu>
    </Box>
  )
}