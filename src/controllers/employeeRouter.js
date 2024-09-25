const express = require("express")
const employeeRouter = express.Router()
const jwt = require("jsonwebtoken")
//const bcrypt = require("bcrypt");

const employeeService = require("../services/employeeService")

// const secretKey = "your-secret-key"

// employeeRouter.post("/register", async (req, res) => {
//   const username = req.body.username
//   const password = req.body.password

//   try {
//     const newUser = await employeeService.addEmployee(username, password)

//     if (!newUser) {
//       res.status(400).json({ message: "Username already taken" })
//     } else {
//       res.status(201).json({ message: "User successfully registered", newUser })
//     }
//   } catch (error) {
//     res.status(500).json({ message: "User registration unsuccessful", error })
//   }
// })

// //problem trying to login in with a non existent user name from login[0].password
// employeeRouter.post("/login", async (req, res) => {
//   const username = req.body.username
//   const password = req.body.password

//   const login = await employeeService.findUser(username)
//   if (!login || password !== login[0].password) {
//     console.log("here is the login password: ", login[0].password)
//     console.log("here is the req password: ", password)
//     res.status(401).json({ message: "invalid creds" })
//   } else {
//     const token = jwt.sign(
//       {
//         id: login[0].employeeID,
//         username: login[0].username,
//         status: login[0].status,
//       },
//       secretKey,
//       {
//         expiresIn: "2m",
//       }
//     )
//     res.json({ token })
//   }
// })

// employeeRouter.get("/protected", authenticationToken, (req, res) => {
//   res.json({ message: "protected route accessed", user: req.user })
// })

// async function authenticationToken(req, res, next) {
//   const authHeader = req.headers["authorization"]
//   const token = authHeader && authHeader.split(" ")[1]

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized access" })
//   }

//   const user = await decodeJWT(token)

//   if (!user) {
//     return res
//       .status(403)
//       .json({ message: "Forbidden: Invalid or expired token" })
//   }

//   req.user = user
//   next()
// }

// async function decodeJWT(token) {
//   try {
//     const user = await jwt.verify(token, secretKey)
//     return user
//   } catch (err) {
//     if (err.name === "TokenExpiredError") {
//       console.error("JWT expired:", err.message)
//       return null
//     } else {
//       console.error("JWT verification failed:", err.message)
//       return null
//     }
//   }
// }

module.exports = employeeRouter
