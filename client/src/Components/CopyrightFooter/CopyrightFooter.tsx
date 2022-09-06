import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export const CopyrightFooter = () => {
  return (
    <>
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
      </Typography >
      <Typography variant="body2" color="text.secondary" sx={{ paddingTop: '5px' }}>
        <Link color="inherit" href="https://mui.com/">
          Customer Connect
        </Link > {' '}
        {new Date().getFullYear()}
      </Typography>
    </>
  )
}