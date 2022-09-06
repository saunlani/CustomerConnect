import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

interface AlertBarProps {
  open: boolean,
  onClose: () => void,
  message: string
}

export const AlertBar = ({ open, onClose, message }: AlertBarProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => onClose()}>
              <CloseIcon fontSize="inherit" />
            </IconButton>} sx={{ mb: 2 }}>
          {message}
        </Alert>
      </Collapse>
    </Box>
  )
}