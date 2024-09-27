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

//reads all tickets in tickets table
async function readTickets() {
  try {
    const scanCommand = new ScanCommand({ TableName: "tickets" })
    const data = await documentClient.send(scanCommand)
    return data.Items
  } catch (err) {
    console.error("error fetching items", err)
  }
}

async function queryTicketsByStatus(status) {
  const command = new QueryCommand({
    TableName: "tickets",
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
    console.log("Error querying tickets by status at the DAO level", err)
  }
}

async function queryTicketsByEmployee(employeeID) {
  const command = new QueryCommand({
    TableName: "tickets",
    IndexName: "createdByIndex", // Optional, use an index if you have one
    KeyConditionExpression: "#createdBy = :createdBy",
    ExpressionAttributeNames: {
      "#createdBy": "createdBy",
    },
    ExpressionAttributeValues: {
      ":createdBy": employeeID,
    },
  })
  try {
    const data = await documentClient.send(command)
    return data.Items
  } catch (err) {
    console.log("Error querying tickets by employee at the DAO level", err)
  }
}

async function createTicket(Item) {
  const command = new PutCommand({ TableName: "tickets", Item })
  try {
    const data = await documentClient.send(command)
    console.log("Inserting ticket into DynamoDB:", Item)

    return data
  } catch (err) {
    console.log("failed to create item at dao level", err)
  }
}

async function updateTicketStatus(ticketID, newStatus) {
  const command = new UpdateCommand({
    TableName: "tickets",
    Key: { TicketID: ticketID }, // Ensure this matches your partition key
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
    return data
  } catch (err) {
    console.log("Failed to update ticket status", err)
  }
}

module.exports = {
  readTickets,
  createTicket,
  updateTicketStatus,
  queryTicketsByStatus,
  queryTicketsByEmployee,
}
