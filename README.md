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

### Create
- **POST** `/users`
    - Description: Create a new user.
    - Request Body: JSON object with item details.
    - These fields are compulsory.
    - Example:
      ```json
      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "example@mail.com"
      }
      ```

### Read
- **GET** `/users`
    - Description: Retrieve a list of all users.

- **GET** `/users/:id`
    - Description: Retrieve a single user by its ID.

### Update
- **PUT** `/users/:id`
    - Description: Update an existing user by its ID.
    - Request Body: JSON object with updated user details.

### Delete
- **DELETE** `/users/:id`
    - Description: Delete a User by its ID.
## Steps to Run the Application



> Use tools like Postman or curl to test these endpoints.
JSON object with updated item details.
