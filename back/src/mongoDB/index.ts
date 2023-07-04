const { MongoClient, ServerApiVersion } = require("mongodb");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient('mongodb+srv://moyi:moyi0614513@moyi.dlrrorh.mongodb.net/?retryWrites=true&w=majority', {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
