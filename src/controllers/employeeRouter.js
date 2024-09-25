const express = require("express")
const employeeRouter = express.Router()
const jwt = require("jsonwebtoken")
//const { authenticateAdminToken } = require("../index")
//const bcrypt = require("bcrypt");

const employeeService = require("../services/employeeService")

const secretKey = "your-secret-key"

//route for a logged in manager to update the status of an employee from 'employee' to 'manager
employeeRouter.put(
  "/update-status",
  authenticateAdminToken,
  async (req, res) => {
    const employeeID = req.body.employeeID
    const newStatus = req.body.status

    console.log("Request body:", req.body)
    console.log("Received newStatus:", newStatus)

    try {
      const result = await employeeService.changeEmployeeStatus(
        employeeID,
        newStatus
      )
      res.status(200).json(result)
    } catch {
      res.status(400).json({ message: "failed to change status: ", result })
    }
  }
)

employeeRouter.get("/", async (req, res) => {
  try {
    const employees = await employeeService.getEmployees()
    res.status(200).json({ employees })
  } catch {
    res.status(400).json({ message: "failed to get employees: " })
  }
})

async function authenticateAdminToken(req, res, next) {
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

module.exports = employeeRouter
