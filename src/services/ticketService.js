const {
  readTickets,
  createTicket,
  updateTicketStatus,
  queryTicketsByStatus,
  queryTicketsByEmployee,
} = require("../repositories/ticketDAO.js")
const { v4: uuidv4 } = require("uuid")

//may have to make sure these are empty before calling a loading function each time
let ticketList = []
let pendingTicketList = []
let approvedTicketList = []
let deniedTicketList = []

async function loadTicketList() {
  try {
    const tickets = await readTickets()
    ticketList.push(...tickets)
  } catch (error) {
    console.log("failed to load ticket list at functions.js level", error)
  }
}

async function loadPendingTicketList() {
  try {
    const pendingTickets = await queryTicketsByStatus("Pending")
    pendingTicketList.push(...pendingTickets)
  } catch (err) {
    console.log(
      "Error querying pending tickets by status at the function.js level",
      err
    )
  }
}

async function loadApprovedTicketList() {
  try {
    const approvedTickets = await queryTicketsByStatus("Approved")
    approvedTicketList.push(...approvedTickets)
  } catch (err) {
    console.log(
      "Error querying approved tickets by status at the function.js level",
      err
    )
  }
}

async function loadDeniedTicketList() {
  try {
    const deniedTickets = await queryTicketsByStatus("Denied")
    deniedTicketList.push(...deniedTickets)
  } catch (err) {
    console.log(
      "Error querying denied tickets by status at the function.js level",
      err
    )
  }
}

async function addTicket(amount, description, employeeID) {
  let unique_key = uuidv4()
  let data = await createTicket({
    TicketID: unique_key,
    amount,
    description,
    status: "Pending",
    createdBy: employeeID,
  })
  console.log("Creating ticket with data:", {
    TicketID: unique_key,
    amount,
    description,
    status: "Pending",
    createdBy: employeeID,
  })

  return data
}

async function updateTicketByStatus(ticketId, newStatus) {
  const data = await updateTicketStatus(ticketId, newStatus)
  return data
}

async function loadTicketsByEmployee(employeeID) {
  try {
    const tickets = await queryTicketsByEmployee(employeeID)
    return tickets
  } catch (err) {
    console.log("Failed to load tickets for employee", err)
  }
}

module.exports = {
  addTicket,
  updateTicketByStatus,
  loadTicketList,
  loadPendingTicketList,
  loadApprovedTicketList,
  loadDeniedTicketList,
  loadTicketsByEmployee,
  ticketList,
  pendingTicketList,
  approvedTicketList,
  deniedTicketList,
}
