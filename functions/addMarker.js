//PLACEHOLDER FOR DATABASE NAME
// Import necessary modules
const { MongoClient } = require('mongodb');

// Define the handler function for the serverless function
const handler = async (req, res) => {
  try {
    // Parse the request body to extract marker data
    const { longitude, latitude } = req.body;

    // Create MongoDB client and connect to database
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    // Access database and markers collection
    const db = client.db('DB-NAME-HERE'); // Placeholder for database name
    const markersCollection = db.collection('markers');

    if (req.method === 'POST') {
      // Insert marker data into markers collection
      const result = await markersCollection.insertOne({ longitude, latitude });
      const insertedMarker = result.ops[0];
      
      // Return a response with status code 200
      res.status(200).json({
        message: 'Marker added successfully',
        marker: insertedMarker
      });
    } else if (req.method === 'GET') {
      // Fetch all markers from the collection
      const markers = await markersCollection.find({}).toArray();
      
      // Return a response with status code 200
      res.status(200).json({
        markers
      });
    }
    
    // Close the MongoDB client connection
    await client.close();
  } catch (error) {
    // If an error occurs, return a response with status code 500
    res.status(500).json({
      error: 'Failed to process request',
      details: error.message
    });
  }
};

// Export the handler function
module.exports = handler;
