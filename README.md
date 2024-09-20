
## Setup Guide

### 1. Initial Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd journal-website
   ```

2. Install backend dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   AZURE_STORAGE_CONNECTION_STRING=your_connection_string
   AZURE_STORAGE_CONTAINER_NAME=your_container_name
   POSTGRES_USER=your_postgres_user
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_DB=your_database_name
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   ```

### 2. Database Setup

1. Install PostgreSQL if not already installed.

2. Create a new database:
   ```
   createdb your_database_name
   ```

3. Connect to the database and create the `files` table:
   ```sql
   CREATE TABLE files (
     id SERIAL PRIMARY KEY,
     filename VARCHAR(255) NOT NULL,
     blob_url VARCHAR(255) NOT NULL,
     upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### 3. Azure Blob Storage Setup

1. Create an Azure account if you don't have one.
2. Create a new Storage account in the Azure portal.
3. In the storage account, create a new container.
4. Get the connection string from the "Access keys" section of your storage account.
5. Add the connection string and container name to your `.env` file.

### 4. Backend Setup

1. Create `server.js` in the root directory with the provided code.
2. Update `package.json` with the necessary scripts.

### 5. Frontend Setup

1. Create the React app:
   ```
   npx create-react-app client
   cd client
   ```

2. Replace the contents of `src/App.js` with the provided code.

3. Update `client/package.json` to include a proxy for local development:
   ```json
   "proxy": "http://localhost:3001"
   ```

### 6. Running the Application

1. Start the backend server:
   ```
   npm run server
   ```

2. In a new terminal, start the frontend:
   ```
   cd client
   npm start
   ```

3. Access the application at `http://localhost:3000`

### 7. Building for Production

1. Build the React app:
   ```
   cd client
   npm run build
   ```

2. Start the production server:
   ```
   cd ..
   npm start
   ```

## API Endpoints

- `POST /upload`: Upload a file
- `GET /files`: Get all file metadata

## Troubleshooting

- Ensure all environment variables are correctly set in the `.env` file.
- Check that PostgreSQL is running and accessible.
- Verify that your Azure Blob Storage connection string is correct and the container exists.

## Future Improvements

- Add user authentication and authorization
- Implement file type restrictions
- Add pagination for file listing
- Improve error handling and user feedback

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.