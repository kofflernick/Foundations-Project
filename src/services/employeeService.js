const {
  readEmployees,
  queryEmployeesByStatus,
  createEmployee,
  updateEmployeeStatus,
} = require("../repositories/employeeDAO.js")
const { v4: uuidv4 } = require("uuid")

async function addEmployee(username, password) {
  let unique_key = uuidv4()
  let data = await createEmployee({
    employeeID: unique_key,
    username,
    password,
    status: "employee",
  })
  return data
}

module.exports = { addEmployee }
