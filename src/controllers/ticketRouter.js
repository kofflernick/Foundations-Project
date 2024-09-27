const express = require("express")
const ticketRouter = express.Router()
const ticketService = require("../services/ticketService")
const jwt = require("jsonwebtoken")
const secretKey = "your-secret-key"
let userID = ""

//AUTHENTICATION MIDDLEWARE
// Authenticate manager token
async function authenticateManagerToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" })
  }

  const user = await decodeJWT(token)

  if (!user || user.status !== "manager") {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired token" })
  }

  req.user = user
  next()
}

// Authenticate employee token
async function authenticateEmployeeToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" })
  }

  const user = await decodeJWT(token)

  if (!user || user.status !== "employee") {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or expired token" })
  }

  req.user = user
  userID = req.user.id
  console.log("Assigned req.user:", req.user.id)
  next()
}

// JWT decoding
async function decodeJWT(token) {
  try {
    const user = await jwt.verify(token, secretKey)
    console.log("Decoded JWT:", user)
    return user
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("JWT expired:", err.message)
    } else {
      console.error("JWT verification failed:", err.message)
    }
    return null
  }
}

//ROUTES
// Get all tickets
ticketRouter.get("/", async (req, res) => {
  let tickets = ticketService.ticketList
  await ticketService.loadTicketList()
  if (tickets) {
    res.status(200).json({ tickets })
  } else {
    res.status(400).json({ message: "Failed to get all items" })
  }
})

// Get pending tickets (requires manager authentication)
ticketRouter.get("/Pending", authenticateManagerToken, async (req, res) => {
  let tickets = ticketService.pendingTicketList
  await ticketService.loadPendingTicketList()
  if (tickets) {
    res.status(200).json({ tickets })
  } else {
    res.status(400).json({ message: "Failed to get all items" })
  }
})

// Get approved tickets
ticketRouter.get("/Approved", async (req, res) => {
  let tickets = ticketService.approvedTicketList
  await ticketService.loadApprovedTicketList()
  if (tickets) {
    res.status(200).json({ tickets })
  } else {
    res.status(400).json({ message: "Failed to get all items" })
  }
})

// Get denied tickets
ticketRouter.get("/Denied", async (req, res) => {
  let tickets = ticketService.deniedTicketList
  await ticketService.loadDeniedTicketList()
  if (tickets) {
    res.status(200).json({ tickets })
  } else {
    res.status(400).json({ message: "Failed to get all items" })
  }
})

// Create a new ticket (requires employee authentication)
ticketRouter.post("/", authenticateEmployeeToken, async (req, res) => {
  const { amount, description } = req.body
  const employeeID = userID
  //console.log("Employee ID from token:", employeeID)

  const data = await ticketService.addTicket(amount, description, employeeID)
  if (data) {
    res
      .status(201)
      .json({ message: `Created Ticket ${JSON.stringify(req.body)}` })
  } else {
    res
      .status(400)
      .json({ message: "Ticket was not created", receivedData: req.body })
  }
})

// Get tickets created by the authenticated employee
ticketRouter.get("/history", authenticateEmployeeToken, async (req, res) => {
  const employeeID = userID
  const tickets = await ticketService.loadTicketsByEmployee(employeeID)

  if (tickets) {
    res.status(200).json({ tickets })
  } else {
    res.status(400).json({ message: "Failed to retrieve tickets" })
  }
})

// Update ticket status (requires manager authentication)
ticketRouter.put("/status", authenticateManagerToken, async (req, res) => {
  const { TicketID, status } = req.body
  const data = await ticketService.updateTicketByStatus(TicketID, status)
  if (data) {
    res.status(201).json({ message: `Updated ticket status to: ${status}` })
  } else {
    res
      .status(400)
      .json({ message: "Ticket not updated", receivedData: req.body })
  }
})

module.exports = ticketRouter
