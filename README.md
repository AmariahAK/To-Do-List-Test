# To-Do List

## Description
A simple to-do list application that allows users to manage their tasks efficiently. Users can create, read, update, and delete tasks.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/to-do-list.git
   ```
2. Navigate to the project directory:
   ```bash
   cd to-do-list
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage Instructions
To start the application, run:
- Then, start the application:
  ```bash
  npm start
  ```
- For the frontend, ensure you have the Live Server extension installed. Open the `frontend` directory and launch the `index.html` file using Live Server. When both the backend and frontend are active, the website will work.

## API Endpoints
- **GET /api/todos**: Retrieve all to-do items.
- **POST /api/todos**: Create a new to-do item.
- **PUT /api/todos/:id**: Update a to-do item by ID.
- **DELETE /api/todos/:id**: Delete a to-do item by ID.

## Technologies Used
- Node.js
- Express
- Mongoose
- Sequelize
- SQLite
- CORS
- dotenv

## License
This project is licensed under the ISC License.
