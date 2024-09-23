const express = require("express")
const ticketRouter = express.Router()

const ticketService = require("../services/ticketService")

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

ticketRouter.post("/", async (req, res) => {
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

ticketRouter.put("/", async (req, res) => {
  const ticketId = req.body.TicketID
  const newStatus = req.body.status
  const data = await ticketService.updateTicketByStatus(ticketId, newStatus)
  if (data) {
    res.status(201).json({ message: `updated ticket status to: ${newStatus}` })
  } else {
    res
      .status(400)
      .json({ message: "ticket not updated", receivedData: req.body })
  }
})

module.exports = ticketRouter
