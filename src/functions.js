const {
  readTickets,
  createTicket,
  updateTicketStatus,
  queryTicketsByStatus,
} = require("./DAO.js")
const { v4: uuidv4 } = require("uuid")

//may have to make sure these are empty before calling a loading function each time
let ticketList = []
let pendingTicketList = []
let approvedTicketList = []
let deniedTicketList = []

async function loadTicketList() {
  try {
    ticketList.push(await readTickets())
    console.log(ticketList)
  } catch (error) {
    console.log("failed to load ticket list at functions.js level", error)
  }
}

async function loadPendingTicketList() {
  try {
    const pendingTickets = await queryTicketsByStatus("Pending")
    console.log("Pending Tickets: ", pendingTickets)
    pendingTicketList.push(pendingTickets)
  } catch (err) {
    console.log(
      "Error querying tickets by status at the function.js level",
      err
    )
  }
}

async function loadApprovedTicketList() {
  try {
    const approvedTickets = await queryTicketsByStatus("Approved")
    console.log("Approved Tickets: ", approvedTickets)
    approvedTicketList.push(approvedTickets)
  } catch (err) {
    console.log(
      "Error querying tickets by status at the function.js level",
      err
    )
  }
}

async function loadDeniedTicketList() {
  try {
    const deniedTickets = await queryTicketsByStatus("Denied")
    console.log("Denied Tickets: ", deniedTickets)
    //problem here does not seem to be pushing to the empty array
    deniedTicketList.push(deniedTickets)
  } catch (err) {
    console.log(
      "Error querying tickets by status at the function.js level",
      err
    )
  }
}

async function addTicket(amount, description) {
  let unique_key = uuidv4()
  let data = await createTicket({
    TicketID: unique_key,
    amount,
    description,
    status: "Pending",
  })
  return data
}

module.exports = {
  addTicket,
  updateTicketStatus,
  loadTicketList,
  loadPendingTicketList,
  loadApprovedTicketList,
  loadDeniedTicketList,
  ticketList,
  pendingTicketList,
  approvedTicketList,
  deniedTicketList,
}
