# Simple CRUD Express.js Application

## Steps to Run the Application

1. Clone the repository:
  ```bash
  git clone <git@github.com:talk2dennis/mini-proj1.git>
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
### Create User
- **POST** `/users`
  - **Description:** Create a new user.
  - **Request Body:** JSON object with `name`, `age` and `email`. Both fields are required.
  - **Example Request:**
    ```json
    {
    "name": "Dohn Doe",
    "email": "johndoe@example.com",
    "age": 20
    }
    ```
  - **Success Response:**
    - **Status:** `201 Created`
    - **Body:**
    ```json
    {
      "id": "1",
      "name": "Dohn Doe",
      "email": "johndoe@example.com",
      "age": 20
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

### Get All Users
- **GET** `/users`
  - **Description:** Retrieve a list of all users.
  - **Success Response:**
    - **Status:** `200 OK`
    - **Body:**
    ```json
    [
      {
      "id": "1",
      "name": "johndDohn Doe",
      "email": "johndoe@example.com",
      "age": 20
      }
    ]
    ```

### Get User by ID
- **GET** `/users/:id`
  - **Description:** Retrieve a single user by their ID.
  - **Success Response:**
    - **Status:** `200 OK`
    - **Body:**
    ```json
    {
      "id": "1",
      "name": "johndDohn Doe",
      "email": "johndoe@example.com",
      "age": 20
    }
    ```
  - **Error Response:**
    - **Status:** `404 Not Found`
    - **Body:**
    ```json
    {
      "error": "User not found"
    }
    ```

### Update User
- **PUT** `/users/:id`
  - **Description:** Update an existing user by their ID.
  - **Request Body:** JSON object with updated `name` and `email`.
  - **Example Request:**
    ```json
    {
    "name": "Jane Doe",
    "email": "janedoe@example.com",
    "age": 20
    }
    ```
  - **Success Response:**
    - **Status:** `200 OK`
    - **Body:**
    ```json
    {
      "id": "1",
      "name": "Jane Doe",
      "email": "janedoe@example.com",
      "age": 20
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
      "error": "User not found"
    }
    ```

### Delete User
- **DELETE** `/users/:id`
  - **Description:** Delete a user by their ID.
  - **Success Response:**
    - **Status:** `204 No Content`
  - **Error Response:**
    - **Status:** `404 Not Found`
    - **Body:**
    ```json
    {
      "error": "User not found"
    }
    ```

## API Documentation

You can explore and test the API using Swagger UI at:

```
http://localhost:5000/api-docs/
```
