import { useState } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { getCustomers } from '../../Services/getCustomers'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'
import { useQuery } from "@tanstack/react-query"
import { CircularProgress } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { EditingCustomer } from '../../types'

interface CustomerDataGridProps {
  handleOpenEditDialog: () => void,
  setEditingCustomer: (customer: EditingCustomer) => void,
  handleOpenConfirmationDialog: () => void
}

export const CustomerDataGrid = ({
  handleOpenEditDialog,
  setEditingCustomer,
  handleOpenConfirmationDialog }: CustomerDataGridProps) => {
  const [pageSize, setPageSize] = useState<number>(5)
  const { isLoading, error, data, refetch } = useQuery(["Customers"], getCustomers)


  const handleTryAgainClick = () => {
    refetch()
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const onClickEdit = () => {
          handleOpenEditDialog()
          setEditingCustomer(params.row)
        }
        const onClickDelete = () => {
          handleOpenConfirmationDialog()
          setEditingCustomer(params.row)
        }
        return <>
          <Tooltip title="Edit"><IconButton onClick={onClickEdit}><EditIcon /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton onClick={onClickDelete}><DeleteIcon /></IconButton></Tooltip>
        </>
      },
    },
    {
      field: 'company',
      headerName: 'Company',
      headerAlign: 'left',
      align: 'left',
      width: 230
    },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 80,
      headerAlign: 'left',
      editable: false,
      renderCell: (params: GridRenderCellParams) => {
        if (params.value === true) return 'Yes'
        if (params.value === false) return 'No'
      },
    },
    {
      field: 'industry',
      headerName: 'Industry',
      width: 130,
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'numberOfProjects',
      headerName: 'Projects',
      type: 'string',
      width: 80,
      headerAlign: 'left',
      align: 'left',
      editable: false,
    }, {
      field: 'about',
      headerName: 'About',
      type: 'string',
      width: 800,
      headerAlign: 'left',
      align: 'left',
      editable: false,
    }]

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6ch' }}><CircularProgress /></div>

  if (error) return (
    <>
      <Stack alignItems="center" spacing={1} sx={{ pt: '30px' }}>
        <Typography variant="h5" color="text.secondary">
          An error has occurred, please try again.
        </Typography>
        <IconButton size="large" onClick={handleTryAgainClick}>
          <RefreshIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </>
  )

  if (data) return (
    <div style={{ height: 400, width: "70%", margin: 'auto' }}>
      <DataGrid
        columnVisibilityModel={{
          id: false,
        }}
        rows={data}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>)
  else return (<></>)
}