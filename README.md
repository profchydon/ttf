## Installation (MacOS)

### Pre-requisite
* Docker Desktop

### Download Code
```
git clone https://github.com/profchydon/ttf.git
```

```
cd tff
```

### Environmental Variables
Ensure the .env file is available in the root directory

### Start application
Open your terminal and run

```
docker compose up
```

Please keep the terminal open so you can see the result


# Tasks

## Todo App

Send requests to the following endpoints.

POST /todos: Create a new todo

```
{
    "name": "Clean house"
}
```

GET /todos: Get all todos

GET /todos/:id: Get a specific todo by ID

DELETE /todos/:id: Delete a todo by ID

PUT /todos/:id: Update a todo by ID
```
{
    "name": "Complete assignment"
}
```

## Fintech CO.
- FINTECH CO. celebrates its company anniversary and wants to invite all customers (in
customers.txt) located within a 100km radius. In order to be able to plan the event, we need
the customer IDs of the customers that should be invited.
- The coordinates of FINTECH CO. are: 52.493256, 13.446082
- The formula which calculates the distance between two coordinates is called Great-Circle
Distance.
- Customer data were exported from the CRM system (customers.txt). Each customer
corresponds to one row. For each customer, the customer ID and the coordinates of the
company address were exported.
- If there is too little or invalid data for some clients, a warning should be given. The process
should not be terminated by that.
- Please publish out all customer IDs of customers that should be invited in alphabetical
order(ascending) to a message broker (e.g. RabbitMQ) and set up a simple client
that reads the messages from the broker and prints them to the console.

```
To view result for invited customers, visit http://localhost:3800/send/invitation
```