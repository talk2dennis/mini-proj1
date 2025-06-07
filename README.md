# Simple CRUD Express.js Application

## Steps to Run the Application

1. Clone the repository:
    ```bash
    git clone <repo-url>
    ```

2. Change to the project directory:
    ```bash
    cd mini-proj1
    ```

3. Install all dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

5. The server will start at `http://localhost:5000`. Use the endpoints below to interact with the API.

## Endpoints
### Create Item
- **POST** `/items`
    - **Description:** Create a new item.
    - **Request Body:** JSON object with `name` and `description`. Both fields are required.
    - **Example Request:**
      ```json
      {
        "name": "Sample Item",
        "description": "This is a sample item."
      }
      ```
    - **Success Response:**
      - **Status:** `201 Created`
      - **Body:**
        ```json
        {
          "id": "1",
          "name": "Sample Item",
          "description": "This is a sample item."
        }
        ```
    - **Error Response:**
      - **Status:** `400 Bad Request`
      - **Body:**
        ```json
        {
          "error": "Missing required fields"
        }
        ```

### Get All Items
- **GET** `/items`
    - **Description:** Retrieve a list of all items.
    - **Success Response:**
      - **Status:** `200 OK`
      - **Body:**
        ```json
        [
          {
            "id": "1",
            "name": "Sample Item",
            "description": "This is a sample item."
          }
        ]
        ```

### Get Item by ID
- **GET** `/items/:id`
    - **Description:** Retrieve a single item by its ID.
    - **Success Response:**
      - **Status:** `200 OK`
      - **Body:**
        ```json
        {
          "id": "1",
          "name": "Sample Item",
          "description": "This is a sample item."
        }
        ```
    - **Error Response:**
      - **Status:** `404 Not Found`
      - **Body:**
        ```json
        {
          "error": "Item not found"
        }
        ```

### Update Item
- **PUT** `/items/:id`
    - **Description:** Update an existing item by its ID.
    - **Request Body:** JSON object with updated `name` and `description`.
    - **Example Request:**
      ```json
      {
        "name": "Updated Item",
        "description": "Updated description."
      }
      ```
    - **Success Response:**
      - **Status:** `200 OK`
      - **Body:**
        ```json
        {
          "id": "1",
          "name": "Updated Item",
          "description": "Updated description."
        }
        ```
    - **Error Responses:**
      - **Status:** `400 Bad Request`
      - **Body:**
        ```json
        {
          "error": "Missing required fields"
        }
        ```
      - **Status:** `404 Not Found`
      - **Body:**
        ```json
        {
          "error": "Item not found"
        }
        ```

### Delete Item
- **DELETE** `/items/:id`
    - **Description:** Delete an item by its ID.
    - **Success Response:**
      - **Status:** `204 No Content`
    - **Error Response:**
      - **Status:** `404 Not Found`
      - **Body:**
        ```json
        {
          "error": "Item not found"
        }
        ```

## API Documentation

You can explore and test the API using Swagger UI at:

```
http://localhost:5000/api-docs/
```
