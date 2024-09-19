const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const { Pool } = require('pg');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const port = 3001;

// Configure Azure Blob Storage
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);

// Configure PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Set up storage engine
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const fileName = `${crypto.randomBytes(16).toString('hex')}${path.extname(file.originalname)}`;

        // Upload file to Azure Blob Storage
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: { blobContentType: file.mimetype }
        });

        // Store metadata in the database
        const query = 'INSERT INTO files (file_name, blob_name, upload_date) VALUES ($1, $2, NOW()) RETURNING id';
        const values = [file.originalname, fileName];
        const dbResponse = await pool.query(query, values);

        res.send(`File uploaded: ${file.originalname}, ID: ${dbResponse.rows[0].id}`);
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});