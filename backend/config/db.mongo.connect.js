const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connect() {
  await client.connect();
  db = client.db('leboncorner');
  console.log('Connecté à MongoDB');
}

function getDb() {
  return db;
}

module.exports = { connect, getDb };