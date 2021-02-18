{
  "id": "@acme/adapter-change_management",
  "type": "Adapter",
  "src": "main.js",
  "export": "ServiceNowAdapter",
  "roles": [
    "admin",
    "engineer",
    "operator"
  ],
  "methods": [
    {
      "name": "getRecord",
      "summary": "Get First Change Ticket",
      "description": "Get the first ServiceNow change management ticket.",
      "input": [],
      "output": {
        "name": "changeTickets",
        "type": "array",
        "description": "An array of objects. Each element is a change management ticket document.",
        "schema": {
          "type": "array",
          "title": "changeTicket",
          "$ref": "changeRequest#/definitions/changeTicket"
        }
      },
      "roles": [
        "admin",
        "engineer",
        "operator"
      ],
      "task": true
    },
    {
      "name": "postRecord",
      "summary": "Create Change Ticket",
      "description": "Create a ServiceNow change management ticket.",
      "input": [],
      "output": {
        "name": "changeTicket",
        "type": "object",
        "description": "AN object of change management ticket document.",
        "schema": {
          "title": "changeTicket",
          "$ref": "changeRequest#/definitions/changeTicket"
        }
      },
      "roles": [
        "admin",
        "engineer",
        "operator"
      ],
      "task": true
    }
  ]
}