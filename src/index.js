const express = require("express")
const app = express()
const logger = require("./util/logger")
const ticketRouter = require("./controllers/ticketRouter.js")
const employeeRouter = require("./controllers/employeeRouter.js")
const ticketDaoDirect = require("./services/ticketService")
const employeeService = require("./services/employeeService")
const jwt = require("jsonwebtoken")

const PORT = 3000

app.use(express.json())

app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} : ${req.url}`)
  next()
})

app.use("/tickets", ticketRouter)
app.use("/employee", employeeRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
