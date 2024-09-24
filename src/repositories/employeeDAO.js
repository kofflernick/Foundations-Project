const { DynamoDBClient } = require(`@aws-sdk/client-dynamodb`)
const {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  PutCommand,
  UpdateCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb")
const client = new DynamoDBClient({ region: "us-east-1" })
const documentClient = DynamoDBDocumentClient.from(client)

async function readEmployees() {
  try {
    const scanCommand = new ScanCommand({ TableName: "employee" })
    const data = await documentClient.send(scanCommand)
    return data.Items
  } catch (err) {
    console.error("error fetching items", err)
  }
}

async function queryEmployeesByStatus(status) {
  const command = new QueryCommand({
    TableName: "employee",
    IndexName: "statusIndex",
    KeyConditionExpression: "#status = :statusVal",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":statusVal": status,
    },
  })
  try {
    const data = await documentClient.send(command)
    return data.Items
  } catch (err) {
    console.log("Error querying employees by status at the DAO level", err)
  }
}

async function findUsername(username) {
  const command = new ScanCommand({
    TableName: "employee",
    FilterExpression: "#username = :username",
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":username": username,
    },
  })

  try {
    const data = await documentClient.send(command)
    if (data.Items && data.Items.length > 0) {
      console.log("username already exists: ", username)
      return true
    }
  } catch (err) {
    console.error("error scanning for username: ", err)
  }
}

async function findUserByName(username) {
  const command = new ScanCommand({
    TableName: "employee",
    FilterExpression: "#username = :username",
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":username": username,
    },
  })

  try {
    const data = await documentClient.send(command)
    if (data.Items) {
      console.log("here is the user: ", data.Items)
      return data.Items
    }
  } catch (err) {
    console.error("error scanning for username: ", err)
  }
}

async function createEmployee(employee) {
  const command = new PutCommand({
    TableName: "employee",
    Item: employee,
  })

  try {
    await documentClient.send(command)
    return employee
  } catch (err) {
    console.log("failed to create employee at dao level", err)
  }
}

async function updateEmployeeStatus(employeeID, newStatus) {
  const command = new UpdateCommand({
    TableName: "employee",
    Key: { employeeID: employeeID },
    UpdateExpression: "set #status = :status",
    ExpressionAttributeNames: {
      "#status": "status",
    },
    ExpressionAttributeValues: {
      ":status": newStatus,
    },
    ReturnValues: "UPDATED_NEW",
  })
  try {
    const data = await documentClient.send(command)
    console.log("employee status updated successfully:", data)
    return data
  } catch (err) {
    console.log("Failed to update employee status", err)
  }
}

module.exports = {
  readEmployees,
  queryEmployeesByStatus,
  createEmployee,
  updateEmployeeStatus,
  findUsername,
  findUserByName,
}
