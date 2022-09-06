import { CustomerModel } from '../../frameworks/database/mongoDB/models/customer'
// Delete single Customer with id
export const deleteById = async (id: string) => {
  return await CustomerModel.findById(id).deleteOne().exec()
}