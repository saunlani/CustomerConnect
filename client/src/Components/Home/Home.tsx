import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { RegisterFormDialog } from '../RegisterFormDialog/RegisterFormDialog'
import { AlertBar } from '../AlertBar/AlertBar'
import { CustomerDataGrid } from '../CustomerDataGrid/CustomerDataGrid'
import { FooterGroup } from '../FooterGroup/FooterGroup'
import { ProblemDialog } from '../ProblemDialog/ProblemDialog'
import { MenuAppBar } from '../MenuAppBar/MenuAppBar'
import { EditFormDialog } from '../EditFormDialog/EditFormDialog'
import { ConfirmationDialog } from '../ConfirmationDialog/ConfirmationDialog'

export const Home = () => {
  const [isAlertBarOpen, setIsAlertBarOpen] = useState(false)
  const [alertBarMessage, setAlertBarMessage] = useState('')
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isProblemDialogOpen, setIsProblemDialogOpen] = useState(false)
  const [problemDialogMessage, setProblemDialogMessage] = useState('')
  const [editingCustomer, setEditingCustomer] = useState({})
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

  const handleOpenAlertBar = () => {
    setIsAlertBarOpen(true)
  }

  const handleCloseAlertBar = () => {
    setIsAlertBarOpen(false)
  }

  const handleOpenRegisterFormDialog = () => {
    setIsRegisterDialogOpen(true)
  }

  const handleOpenEditDialog = () => {
    setIsEditDialogOpen(true)
    setEditingCustomer({})
  }

  const handleOpenConfirmationDialog = () => {
    setIsConfirmationDialogOpen(true)
  }

  const handleOpenProblemDialog = () => {
    setIsProblemDialogOpen(true)
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Customer Connect
          </Typography>
          <nav>
            <MenuAppBar
              handleOpenRegisterFormDialog={handleOpenRegisterFormDialog} />
          </nav>
        </Toolbar>
      </AppBar>
      <AlertBar message={alertBarMessage} open={isAlertBarOpen} onClose={() => setIsAlertBarOpen(false)}></AlertBar>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom>
          Welcome
        </Typography>
      </Container>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        Use the table below or click on the menu at the top to create a new customer
      </Typography>

      <Container sx={{ mb: 2, align: 'center' }}>
      </Container>
      <CustomerDataGrid
        handleOpenEditDialog={handleOpenEditDialog}
        setEditingCustomer={setEditingCustomer}
        handleOpenConfirmationDialog={handleOpenConfirmationDialog} />
      <FooterGroup />

      <RegisterFormDialog
        open={isRegisterDialogOpen}
        onClose={() => setIsRegisterDialogOpen(false)}
        handleOpenAlertBar={handleOpenAlertBar}
        handleCloseAlertBar={handleCloseAlertBar}
        setAlertBarMessage={setAlertBarMessage}
        handleOpenProblemDialog={handleOpenProblemDialog}
        setProblemDialogMessage={setProblemDialogMessage}
      />

      <EditFormDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        handleOpenAlertBar={handleOpenAlertBar}
        handleCloseAlertBar={handleCloseAlertBar}
        setAlertBarMessage={setAlertBarMessage}
        handleOpenProblemDialog={handleOpenProblemDialog}
        setProblemDialogMessage={setProblemDialogMessage}
        editingCustomer={editingCustomer}
      />

      <ProblemDialog
        message={problemDialogMessage}
        open={isProblemDialogOpen}
        onClose={() => setIsProblemDialogOpen(false)}
      />

      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        onClose={() => setIsConfirmationDialogOpen(false)}
        editingCustomer={editingCustomer}
        setProblemDialogMessage={setProblemDialogMessage}
        handleOpenProblemDialog={handleOpenProblemDialog}
        setAlertBarMessage={setAlertBarMessage}
        handleOpenAlertBar={handleOpenAlertBar}
        handleCloseAlertBar={handleCloseAlertBar} />
    </>
  )
}