const {
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
} = require("./functions.js")

//works
//loadTicketList()
//addTicket(4, "this is the description")
//updateTicketStatus("cf87045a-4127-4573-b65f-c5137de56ee0", "Denied")
//loadPendingTicketList()
//loadApprovedTicketList()
//loadDeniedTicketList()

//works
// async function run() {
//   await loadTicketList()
//   console.log("loaded tickets: ", ticketList)
//   ticketList.length = 0
// }

//works
// async function run() {
//   await loadPendingTicketList()
//   console.log("loaded tickets: ", pendingTicketList)
//   pendingTicketList.length = 0
// }

// works
// async function run() {
//   await loadApprovedTicketList()
//   console.log("loaded tickets: ", approvedTicketList)
//   approvedTicketList.length = 0
// }

// works
// async function run() {
//   await loadDeniedTicketList()
//   console.log("loaded tickets: ", deniedTicketList)
//   deniedTicketList.length = 0
// }

// run()
// run()
