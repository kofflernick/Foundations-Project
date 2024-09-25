const {
  readEmployees,
  queryEmployeesByStatus,
  createEmployee,
  updateEmployeeStatus,
  findUsername,
  findUserByName,
} = require("../repositories/employeeDAO.js")
const { v4: uuidv4 } = require("uuid")

async function addEmployee(username, password) {
  const doesUserNameExist = await findUsername(username)

  if (doesUserNameExist) {
    console.log("Username already exists, returning null")
    return null
  } else {
    let unique_key = uuidv4()
    let data = await createEmployee({
      employeeID: unique_key,
      username,
      password,
      status: "employee",
    })
    console.log("Created new employee:", data)
    return data
  }
}

async function findUser(username) {
  const user = await findUserByName(username)
  return user
}

async function changeEmployeeStatus(employeeID, newStatus) {}

module.exports = { addEmployee, findUser }
