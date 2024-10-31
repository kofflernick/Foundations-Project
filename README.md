# Employee Expense Reimbursement System

This project is an Employee Expense Reimbursement System, built to help organizations track and manage employee expense claims. It allows employees to submit expense tickets, which can then be reviewed and updated to reflect their status (Pending, Approved, Denied) by authorized personnel. Implemented with Node.js, Express, and DynamoDB.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)

## Features

- **Employee Management**: Add, update, and query employees in the system.
- **Expense Ticketing**: Employees can create tickets for expense reimbursement.
- **Status Tracking**: Track tickets by their status (Pending, Approved, Denied).
- **Data Persistence**: Stores employee and ticket information in DynamoDB.
- **Modular Architecture**: Organized with service, repository, and controller layers.
- **Automated Testing**: Jest tests to verify functionality.

## Project Structure

```
src/
├── controllers/              # Route handlers and API endpoints
├── services/                 # Business logic
├── repositories/             # Data access and DynamoDB operations
├── __tests__/                # Jest tests for service layer functions
└── util/                    # Utilities (logger)
README.md                     # Project documentation
```

## Installation

1. Clone the repository:

   ```bash
   gh repo clone kofflernick/Foundations-Project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To start the server, run:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## Testing

To run tests, use:

```bash
npm test
```
