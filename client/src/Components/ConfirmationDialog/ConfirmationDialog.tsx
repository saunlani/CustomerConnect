import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { deleteCustomer } from "../../Services/deleteCustomer"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EditingCustomer } from "../../types"

interface ConfirmationDialogProps {
  open: boolean,
  onClose: () => void,
  editingCustomer: EditingCustomer,
  handleOpenProblemDialog: () => void,
  setProblemDialogMessage: (message: string) => void,
  setAlertBarMessage: (message: string) => void,
  handleOpenAlertBar: () => void,
  handleCloseAlertBar: () => void
}

export const ConfirmationDialog = ({
  open,
  onClose,
  editingCustomer,
  handleOpenProblemDialog,
  setProblemDialogMessage,
  setAlertBarMessage,
  handleOpenAlertBar,
  handleCloseAlertBar
}: ConfirmationDialogProps) => {
  const queryClient = useQueryClient()
  const mutation = useMutation(deleteCustomer, {
    onError: (error) => {
      if (error == 'Error: Error: No Customer found with this ID') {
        setProblemDialogMessage('An Customer could not be found with the provided ID.')
      }
      else {
        setProblemDialogMessage('There was a problem processing this request. Please try again.')
      }
      handleOpenProblemDialog()
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['Customers'])
      setAlertBarMessage("" + editingCustomer.company + '\'s record was deleted.')
      handleOpenAlertBar()
      setTimeout(
        () => handleCloseAlertBar(),
        5000
      )
      onClose()
    }
  })

  const handleClickCancel = () => {
    onClose()
  }

  const handleClickDelete = async () => {
    mutation.mutate(editingCustomer)
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Customer"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {editingCustomer.company}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickDelete} variant="contained" type="submit">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}