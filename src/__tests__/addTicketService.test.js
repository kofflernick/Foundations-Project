const { addTicket } = require("../services/ticketService")
const { createTicket } = require("../repositories/ticketDAO.js")
const { v4: uuidv4 } = require("uuid")

/**
 *
 * tests for the functionality of the adding a ticket service layer
 */

jest.mock("../repositories/ticketDAO.js", () => ({
  createTicket: jest.fn(),
}))
jest.mock("uuid", () => ({
  v4: jest.fn(),
}))

describe("addTicketService", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  //test should successfully create a ticket
  it("should create a new ticket with pending status", async () => {
    const uniqueKey = "mock-uuid"
    uuidv4.mockReturnValue(uniqueKey)
    const amount = 100
    const description = "Travel expenses"
    const employeeID = "emp123"

    const mockResponse = {
      TicketID: uniqueKey,
      amount,
      description,
      status: "Pending",
      createdBy: employeeID,
    }
    createTicket.mockResolvedValue(mockResponse)

    const result = await addTicket(amount, description, employeeID)

    expect(createTicket).toHaveBeenCalledWith({
      TicketID: uniqueKey,
      amount,
      description,
      status: "Pending",
      createdBy: employeeID,
    })
    expect(result).toEqual(mockResponse)
  })

  //should test error handling for creating a ticket
  it("should handle errors when creating a ticket", async () => {
    const uniqueKey = "mock-uuid"
    uuidv4.mockReturnValue(uniqueKey)
    createTicket.mockRejectedValue(new Error("Failed to create ticket"))

    await expect(addTicket(100, "Travel expenses", "emp123")).rejects.toThrow(
      "Failed to create ticket"
    )
    expect(createTicket).toHaveBeenCalled()
  })
})
