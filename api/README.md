# ToDo API

This API provides endpoints to manage a collection of ToDo items.

## Base URL

```
http://localhost:7979/api/v1/todos
```

## Endpoints

### 1. Get All ToDos

**GET** `/api/v1/todos`

Retrieve a paginated list of ToDo items.

#### Request

```bash
curl -X GET "http://localhost:7979/api/v1/todos?page=1&limit=10" \
-H "Content-Type: application/json"
```

### 2. Get ToDo By ID

**GET** `/api/v1/todos/:id`

Retrieve a specific ToDo item by its ID.

#### Request

```bash
curl -X GET "http://localhost:7979/api/v1/todos/:id" \
-H "Content-Type: application/json"
```

### 3. Create ToDo

**POST** `/api/v1/todos`

Create a new ToDo item.

#### Request

```bash
curl -X POST "http://localhost:7979/api/v1/todos" \
-H "Content-Type: application/json" \
-d '{
  "title": "Sample ToDo",
  "description": "This is a sample ToDo description",
  "dueDate": "2024-08-31T00:00:00.000Z",
  "priority": "medium"
}'
```

### 4. Update ToDo

**PUT** `/api/v1/todos/:id`

Update an existing ToDo item by its ID.

#### Request

```bash
curl -X PUT "http://localhost:7979/api/v1/todos/:id" \
-H "Content-Type: application/json" \
-d '{
  "title": "Updated ToDo",
  "description": "This is an updated ToDo description",
  "dueDate": "2024-09-15T00:00:00.000Z",
  "priority": "high"
}'
```

### 5. Delete ToDo

**DELETE** `/api/v1/todos/:id`

Delete a ToDo item by its ID.

#### Request

```bash
curl -X DELETE "http://localhost:7979/api/v1/todos/:id" \
-H "Content-Type: application/json"
```

## Notes

- Replace `:id` in the endpoints with the actual ID of the ToDo item.
- Ensure the API server is running at `localhost:7979` before making requests.
