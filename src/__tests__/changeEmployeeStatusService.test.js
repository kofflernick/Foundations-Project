const { changeEmployeeStatus } = require("../services/employeeService")
const { updateEmployeeStatus } = require("../repositories/employeeDAO.js")

/**
 *
 * tests for the changeEmployeeStatus functionality
 */

jest.mock("../repositories/employeeDAO.js", () => ({
  updateEmployeeStatus: jest.fn(),
}))

describe("changeEmployeeStatusService", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  //tests if a valid update can be made
  it("should update the employee status successfully", async () => {
    const employeeID = "some-employee-id"
    const newStatus = "manager"
    const mockResponse = { Attributes: { status: newStatus } }
    updateEmployeeStatus.mockResolvedValue(mockResponse)

    const result = await changeEmployeeStatus(employeeID, newStatus)

    expect(updateEmployeeStatus).toHaveBeenCalledWith(employeeID, newStatus)
    expect(result).toEqual(mockResponse)
  })

  //attempts to update with an invalid status
  it("should handle errors when updating employee status", async () => {
    const employeeID = "some-employee-id"
    const newStatus = "manager"
    const error = new Error("Failed to update employee status")
    updateEmployeeStatus.mockRejectedValue(error)

    await expect(changeEmployeeStatus(employeeID, newStatus)).rejects.toThrow(
      "Failed to update employee status"
    )
    expect(updateEmployeeStatus).toHaveBeenCalledWith(employeeID, newStatus)
  })
})
