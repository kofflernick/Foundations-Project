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
app.use("/employees", employeeRouter)

const secretKey = "your-secret-key"

app.post("/register", async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  try {
    const newUser = await employeeService.addEmployee(username, password)

    if (!newUser) {
      res.status(400).json({ message: "username already taken" })
    } else {
      res.status(201).json({ message: "user successfully registered", newUser })
    }
  } catch (error) {
    res.status(500).json({ message: "user registration unsuccessful", error })
  }
})

//problem trying to login in with a non existent user name from login[0].password
app.post("/login", async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  try {
    const login = await employeeService.findUser(username)
    if (!login || login.length === 0) {
      return res.status(401).json({ message: "User not found" })
    }
    if (password !== login[0].password) {
      console.log("entered password does not match stored password")
      return res.status(401).json({ message: "invalid credentials" })
    }
    const token = jwt.sign(
      {
        id: login[0].employeeID,
        username: login[0].username,
        status: login[0].status,
      },
      secretKey,
      {
        expiresIn: "15m", 
      }
    )

    console.log("employee ID being added to JWT:", login[0].employeeID)
    res.json({ token })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "login failed", error })
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
