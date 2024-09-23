const {
  readEmployees,
  queryEmployeesByStatus,
  createEmployee,
  updateEmployeeStatus,
  findUsername,
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

async function userNameExists(username) {
  const userNameExists = await findUsername(username)
  if (userNameExists) {
    return true
  } else {
    return false
  }
}

module.exports = { addEmployee, userNameExists }
