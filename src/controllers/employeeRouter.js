const express = require("express")
const employeeRouter = express.Router()
const jwt = require("jsonwebtoken")
//const bcrypt = require("bcrypt");

const employeeService = require("../services/employeeService")

const secretKey = "your-secret-key"

employeeRouter.get(
  "/change-employee-status",
  authenticateAdminToken,
  (req, res) => {
    res.json({ message: "protected route accessed", user: req.user })
  }
)

async function authenticateAdminToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" })
  } else {
    const user = await decodeJWT(token)

    if (!user || user.status !== "manager") {
      console.log(user.satus)
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
