import express, { Request, Response } from "express"
import { fetchAllCustomers, createCustomer, createManyCustomers, deleteCustomerById, updateCustomerById } from '../../../../../controllers/customerController'
import { errorHandler } from '../../../middlewares/errorHandler/errorHandler'
import { validateSchema } from '../../../middlewares/validations/validateSchema'
import { deleteCustomerSchema, registerCustomerSchema, updateCustomerSchema } from '../../../middlewares/validations/schema/customer'
import { validateArraySchema } from '../../../middlewares/validations/validateArraySchema'

export const customerRouter = () => {
  const router = express.Router()

  // GET endpoints
  router.get('/', errorHandler(async (req: Request, res: Response) => {
    const allCustomers = await fetchAllCustomers()
    if (!allCustomers.length) {
      return res.status(200).json({ data: [], msg: 'No customers found' })
    }
    return res.status(200).json({ data: allCustomers })
  }))

  // POST endpoints
  router.post('/', validateSchema(registerCustomerSchema), errorHandler(async (req: Request, res: Response) => {
    const newCustomer = await createCustomer(req.body)
    return res.status(201).json({ msg: "Customer created successfully.", data: newCustomer })
  }))

  router.post('/import', validateArraySchema(registerCustomerSchema), errorHandler(async (req: Request, res: Response) => {
    const newCustomers = await createManyCustomers(req.body)
    return res.status(201).json({ msg: "Customers created successfully.", data: newCustomers })
  }))

  // PUT endpoint
  router.put('/', validateSchema(updateCustomerSchema), errorHandler(async (req: Request, res: Response) => {
    const customer = await updateCustomerById(req.body)
    if (customer) {
      return res.status(200).json({ msg: 'Customer updated successfully', data: customer })
    }
    else {
      return res.status(404).json({ msg: 'A customer with this id could not be found or updated' })
    }
  }))

  // DELETE endpoints
  router.delete('/:id', validateSchema(deleteCustomerSchema), errorHandler(async (req: Request, res: Response) => {
    const customer = await deleteCustomerById(req.params.id)
    if (customer.deletedCount === 0) {
      return res.status(404).json({ msg: 'No customer found with the provided id' })
    }
    return res.status(200).json({ msg: 'Customer deleted successfully' })
  }))
  return router
}