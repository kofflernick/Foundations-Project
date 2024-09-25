const express = require("express")
const ticketRouter = express.Router()
const ticketService = require("../services/ticketService")
const jwt = require("jsonwebtoken")
const secretKey = "your-secret-key"

ticketRouter.get("/", async (req, res) => {
  let tickets = ticketService.ticketList
  await ticketService.loadTicketList()
  if (tickets) {
    res.status(200).json({ tickets })
  } else {
    res.status(400).json({ message: "Failed to get all items" })
  }
})

ticketRouter.get("/Pending", async (req, res) => {
  let tickets = ticketService.pendingTicketList
  await ticketService.loadPendingTicketList()
  if (tickets) {
    res.status(200).json({ tickets })
  } else {
    res.status(400).json({ message: "Failed to get all items" })
  }
})

ticketRouter.get("/Approved", async (req, res) => {
  let tickets = ticketService.approvedTicketList
  await ticketService.loadApprovedTicketList()
  if (tickets) {
    res.status(200).json({ tickets })
  } else {
    res.status(400).json({ message: "Failed to get all items" })
  }
})

ticketRouter.get("/Denied", async (req, res) => {
  let tickets = ticketService.deniedTicketList
  await ticketService.loadDeniedTicketList()
  if (tickets) {
    res.status(200).json({ tickets })
  } else {
    res.status(400).json({ message: "Failed to get all items" })
  }
})

ticketRouter.post("/", authenticateEmployeeToken, async (req, res) => {
  const amount = req.body.amount
  const description = req.body.description
  const data = await ticketService.addTicket(amount, description)
  if (data) {
    res
      .status(201)
      .json({ message: `Created Ticket ${JSON.stringify(req.body)}` })
  } else {
    res.status(400).json({ message: "Was not created", receivedData: req.body })
  }
})

ticketRouter.put(
  "/update-status",
  authenticateManagerToken,
  async (req, res) => {
    const ticketId = req.body.TicketID
    const newStatus = req.body.status
    const data = await ticketService.updateTicketByStatus(ticketId, newStatus)
    if (data) {
      res
        .status(201)
        .json({ message: `updated ticket status to: ${newStatus}` })
    } else {
      res
        .status(400)
        .json({ message: "ticket not updated", receivedData: req.body })
    }
  }
)

//authenticate manager
async function authenticateManagerToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" })
  } else {
    const user = await decodeJWT(token)

    if (!user || user.status !== "manager") {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or expired token" })
    }

    req.user = user
    next()
  }
}

// authenticate employee
async function authenticateEmployeeToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" })
  } else {
    const user = await decodeJWT(token)

    if (!user || user.status !== "employee") {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or expired token" })
    }

    req.user = user
    next()
  }
}

async function decodeJWT(token) {
  try {
    const user = await jwt.verify(token, secretKey)
    return user
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("JWT expired:", err.message)
      return null
    } else {
      console.error("JWT verification failed:", err.message)
      return null
    }
  }
}

module.exports = ticketRouter
