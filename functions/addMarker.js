const { MongoClient } = require('mongodb');

exports.handler = async (event) => {
  try {
    // Parse the request body to extract marker data
    const { longitude, latitude } = JSON.parse(event.body);

    // Create MongoDB client and connect to database
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    // Access database and markers collection
    const db = client.db('DB-NAME-HERE'); //PLACEHOLDER FOR DB NAME
    const markersCollection = db.collection('markers');

    //Insert marker data into markers collection
    const result = await markersCollection.insertOne({ longitude, latitude });
    const insertedMarker = result.ops[0];

    //Close the MongoDB client connection
    await client.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Marker added successfully', marker: insertedMarker }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add marker', details: error }),
    };
  }
};
