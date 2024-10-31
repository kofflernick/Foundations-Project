const { addEmployee } = require("../services/employeeService")
const {
  findUsername,
  createEmployee,
} = require("../repositories/employeeDAO.js")

/**
 *
 * tests for addEmployee functionality
 *  */

jest.mock("../repositories/employeeDAO.js", () => ({
  findUsername: jest.fn(),
  createEmployee: jest.fn(),
}))

describe("addEmployeeService", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  //tries to add an employee that already exists
  it("should return null if username already exists", async () => {
    findUsername.mockResolvedValue(true)
    const result = await addEmployee("existingUser", "password123")
    expect(findUsername).toHaveBeenCalledWith("existingUser")
    expect(result).toBeNull()
  })

  //tries to createa new valid employee
  it("should create a new employee if username does not exist", async () => {
    findUsername.mockResolvedValue(false)
    createEmployee.mockResolvedValue({
      employeeID: "some-unique-id",
      username: "newUser",
      password: "password123",
      status: "employee",
    })

    const result = await addEmployee("newUser", "password123")

    expect(findUsername).toHaveBeenCalledWith("newUser")
    expect(createEmployee).toHaveBeenCalledWith({
      employeeID: expect.any(String),
      username: "newUser",
      password: "password123",
      status: "employee",
    })
    expect(result).toEqual({
      employeeID: expect.any(String),
      username: "newUser",
      password: "password123",
      status: "employee",
    })
  })
})
