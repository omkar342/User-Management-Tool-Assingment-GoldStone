# Node.js TypeScript Project

This is a Node.js project built with TypeScript. It includes an API endpoint for exporting data from a MongoDB database to a CSV file.

## Prerequisites

- Node.js (version X.X.X)
- MongoDB (version X.X.X)
- npm (version X.X.X) or yarn (version X.X.X)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your/repository.git
   ```

2. Install all dependencies

```
npm install

```

3. Set up the MongoDB connection:

Update the MongoDB connection URL in server.ts file according to your database configuration.

## Usage

1. Start the server

```
nodemon
```

The server will start running on http://localhost:3000.

Access the /export endpoint to generate the CSV file. The file will be downloaded automatically.

## API Endpoint

/export
Method: GET
Description: Generate a CSV file containing data from the MongoDB database.
Response: CSV file download
