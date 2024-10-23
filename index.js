const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB connection URI
const client = new MongoClient(uri);

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("contact"); // Replace "contact" with your desired database name
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connectToDB;

async function createCollection(db) {
    try {
      const result = await db.createCollection("contactlist"); // Replace "contactlist" with your desired collection name
      console.log("Collection created:", result);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  }
  
  // Call the createCollection function after connecting
  (async () => {
    const db = await connectToDB();
    await createCollection(db);
  })();

  async function insertDocuments(db) {
    const contacts = [
      { lastName: "Ben", firstName: "Moris", email: "ben@gmail.com", age: 26 },
      { lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 },
      { lastName: "Emilie", firstName: "Brouge", email: "emilie.b@gmail.com", age: 40 },
      { lastName: "Alex", firstName: "Brown", age: 4 },
      { lastName: "Denzel", firstName: "Washington", age: 3 },
    ];
    try {
      const result = await db.collection("contactlist").insertMany(contacts);
      console.log("Documents inserted:", result.insertedIds);
    } catch (error) {
      console.error("Error inserting documents:", error);
    }
  }
  
  // Call the insertDocuments function after connecting
  (async () => {
    const db = await connectToDB();
    await insertDocuments(db);
  })();

  async function displayContacts(db) {
    try {
      const cursor = await db.collection("contactlist").find({}); // Find all documents
      const results = await cursor.toArray();
      console.log("All Contacts:", results);
    } catch (error) {
      console.error("Error retrieving contacts:", error);
    }
  }
  
  // Call the displayContacts function after connecting
  (async () => {
    const db = await connectToDB();
    await displayContacts(db);
  })();

  async function findContactById(db, id) {
    try {
      const _id = require("mongodb").ObjectID(id); // Convert string ID to ObjectID
      const result = await db.collection("contactlist").findOne({ _id });
      console.log("Contact by ID:", result);
    } catch (error) {
      console.error("Error finding contact by ID:", error);
    }
  }
  
  // Replace "your_id" with the actual ID you want to find
  const your_id = "6351f7234e1923b2349c4321"; // Replace with a valid ObjectID
  (async () => {
    const db = await connectToDB();
    await findContactById(db, your_id);
  })();