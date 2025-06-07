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

### Create User
- **POST** `/users`
    - **Description:** Create a new user.
    - **Request Body:** JSON object with user details. All fields are required.
    - **Example Request:**
      ```json
      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "example@mail.com"
      }
      ```
    - **Success Response:**
      - **Status:** `201 Created`
      - **Body:**
        ```json
        {
          "id": "1",
          "firstName": "John",
          "lastName": "Doe",
          "email": "example@mail.com"
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
      - **Status:** `409 Conflict`
      - **Body:**
        ```json
        {
          "error": "Email already exists"
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
            "firstName": "John",
            "lastName": "Doe",
            "email": "example@mail.com"
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
          "firstName": "John",
          "lastName": "Doe",
          "email": "example@mail.com"
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
    - **Request Body:** JSON object with updated user details.
    - **Example Request:**
      ```json
      {
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@mail.com"
      }
      ```
    - **Success Response:**
      - **Status:** `200 OK`
      - **Body:**
        ```json
        {
          "id": "1",
          "firstName": "Jane",
          "lastName": "Smith",
          "email": "jane.smith@mail.com"
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

> Use tools like Postman or curl to test these endpoints.

