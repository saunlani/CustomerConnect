import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { CustomerSchema } from '../../Validations/CustomerValidation'
import { updateCustomer } from '../../Services/updateCustomer'
import { useFormik } from 'formik'
import Grid from '@mui/material/Grid'
import { mapCustomerFromFormik } from '../../Mappers/mapCustomerFromFormik'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Moment from 'moment'
import { EditingCustomer, FormValues, Project } from '../../types'

interface EditFormDialogProps {
  open: boolean,
  onClose: () => void,
  editingCustomer: EditingCustomer,
  setProblemDialogMessage: (message: string) => void,
  handleOpenProblemDialog: () => void,
  setAlertBarMessage: (message: string) => void,
  handleOpenAlertBar: () => void,
  handleCloseAlertBar: () => void,
}

export const EditFormDialog = ({
  open,
  onClose,
  editingCustomer,
  setAlertBarMessage,
  setProblemDialogMessage,
  handleOpenProblemDialog,
  handleOpenAlertBar,
  handleCloseAlertBar }: EditFormDialogProps) => {

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: editingCustomer.id,
      isActive: editingCustomer.isActive || false,
      company: editingCustomer.company || '',
      industry: editingCustomer.industry || '',
      about: editingCustomer.about || '',
    },
    validationSchema: CustomerSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  })
  const queryClient = useQueryClient()
  const mutation = useMutation(updateCustomer, {
    onError: () => {
      setProblemDialogMessage('There was a problem processing this request. Please try again.')
      handleOpenProblemDialog()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Customers'])
      setAlertBarMessage('Edit complete!')
      handleOpenAlertBar()
      setTimeout(
        () => handleCloseAlertBar(),
        5000
      )
      formik.handleReset(Event)
      onClose()
    }
  })

  const handleClickCancel = () => {
    formik.handleReset(Event)
    onClose()
  }

  const handleSubmit = async (values: FormValues) => {
    const newValues = await mapCustomerFromFormik(values)
    mutation.mutate(newValues)
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{ pt: '20px' }}>{editingCustomer.company}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1} >
              <Grid item xs={2} >
                <FormControlLabel
                  sx={{ pt: '7px' }}
                  control={
                    <Checkbox
                      id="isActive"
                      name="isActive"
                      checked={formik.values.isActive}
                      onChange={formik.handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />} label={'Active'} />
                {formik.errors.isActive && <p>{formik.errors.isActive.toString()}</p>}
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
                  helperText={formik.touched.company && formik.errors.company?.toString()}
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
                  helperText={formik.touched.industry && formik.errors.industry?.toString()}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="about"
                  multiline
                  label="About"
                  value={formik.values.about}
                  onChange={formik.handleChange}
                  error={formik.touched.about && Boolean(formik.errors.about)}
                  helperText={formik.touched.about && formik.errors.about?.toString()}
                  rows={2}
                  sx={{
                    mt: 2.4,
                  }}
                />
              </Grid>

              {editingCustomer.numberOfProjects > 0 &&
                <Grid container spacing={1} sx={{ pt: '20px' }}>
                  <Grid item xs={12} >
                    <Typography variant="h6" sx={{ pl: '10px' }} gutterBottom>
                      {editingCustomer.company}&#39;s Projects
                    </Typography>
                  </Grid>
                  {editingCustomer.projects && editingCustomer.projects.map((project: Project) => (
                    <Grid item xs={12} key={project.id}>
                      <Card >
                        <CardContent>
                          {project.name}
                          {project.contact && <Typography sx={{ fontSize: 12, mb: 1 }} color="text.secondary">
                            {project.contact}
                          </Typography>}
                          {project.start_date && <Typography sx={{ fontSize: 12 }} gutterBottom>
                            Start Date: {Moment(project.start_date).format('DD.MM.YYYY')}
                          </Typography>}
                          {project.end_date && <Typography sx={{ fontSize: 12 }} gutterBottom>
                            End Date: {Moment(project.end_date).format('DD.MM.YYYY')}
                          </Typography>}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              }
            </Grid>
            <DialogActions>
              <Button onClick={handleClickCancel}>Cancel</Button>
              <Button variant="contained" type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent >
      </Dialog >
    </>
  )
}