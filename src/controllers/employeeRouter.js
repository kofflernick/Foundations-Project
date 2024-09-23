const express = require("express")
const employeeRouter = express.Router()
//const bcrypt = require("bcrypt");

const employeeService = require("../services/employeeService")

employeeRouter.post("/register", async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const checkUserName = await employeeService.userNameExists(username)

  if (checkUserName == true) {
    res.status(409).json({ message: "Username already taken" })
  } else if (checkUserName == false) {
    const newUser = await employeeService.addEmployee(username, password)
    if (newUser) {
      res.status(201).json({ message: "User successfully registered", newUser })
    } else {
      res.status(400).json({ message: "user registration unsuccessful" })
    }
  }

  // const newUser = await employeeService.addEmployee(username, password)
  // if (newUser) {
  //   res.status(201).json({ message: "User successfully registered", newUser })
  // } else {
  //   res.status(400).json({ message: "user registration unsuccessful" })
  // }
})

module.exports = employeeRouter
