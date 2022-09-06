import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { CustomerSchema } from '../../Validations/CustomerValidation'
import { registerCustomer } from '../../Services/registerCustomer'
import { useFormik } from 'formik'
import Grid from '@mui/material/Grid'
import { mapCustomerFromFormik } from '../../Mappers/mapCustomerFromFormik'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { FormValues } from '../../types'

interface RegisterFormDialogProps {
  open: boolean,
  onClose: () => void,
  setProblemDialogMessage: (message: string) => void,
  handleOpenProblemDialog: () => void,
  setAlertBarMessage: (message: string) => void,
  handleOpenAlertBar: () => void,
  handleCloseAlertBar: () => void,
}


export const RegisterFormDialog = ({
  open,
  onClose,
  setAlertBarMessage,
  setProblemDialogMessage,
  handleOpenProblemDialog,
  handleOpenAlertBar,
  handleCloseAlertBar }: RegisterFormDialogProps) => {

  const queryClient = useQueryClient()
  const mutation = useMutation(registerCustomer, {
    onError: () => {
      setProblemDialogMessage('There was a problem processing this request. Please try again.')
      handleOpenProblemDialog()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Customers'])
      setAlertBarMessage('Registration complete!')
      handleOpenAlertBar()
      setTimeout(
        () => handleCloseAlertBar(),
        5000
      )
      formik.handleReset(Event)
      onClose()
    }
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      isActive: false,
      company: '',
      industry: '',
      about: '',
    },
    validationSchema: CustomerSchema,
    onSubmit: (values: FormValues) => {
      handleSubmit(values)
    },
  })

  const handleSubmit = async (values: FormValues) => {
    const newValues = await mapCustomerFromFormik(values)
    mutation.mutate(newValues)
  }

  const handleClickCancel = () => {
    formik.handleReset(Event)
    onClose()
  }

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Create a Customer</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <FormControlLabel
                  sx={{ pt: '7px' }}
                  control={
                    <Checkbox
                      id="isActive"
                      value={formik.values.isActive}
                      onChange={formik.handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />} label={'Active'} />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="standard"
                  id="company"
                  name="company"
                  label="Company"
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  error={formik.touched.company && Boolean(formik.errors.company)}
                  helperText={formik.touched.company && formik.errors.company}
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  fullWidth
                  variant="standard"
                  id="industry"
                  name="industry"
                  label="Industry"
                  value={formik.values.industry}
                  onChange={formik.handleChange}
                  error={formik.touched.industry && Boolean(formik.errors.industry)}
                  helperText={formik.touched.industry && formik.errors.industry}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  id="about"
                  label="About"
                  value={formik.values.about}
                  onChange={formik.handleChange}
                  error={formik.touched.about && Boolean(formik.errors.about)}
                  helperText={formik.touched.about && formik.errors.about}
                  rows={2}
                  sx={{
                    mt: 2.4,
                  }}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleClickCancel}>Cancel</Button>
              <Button variant="contained" type="submit">Register</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}