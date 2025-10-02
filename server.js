const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

// ⚠️ Usa variable de entorno en Render, no la pongas fija
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function startServer() {
  try {
    // Conectar a MongoDB
    await client.connect();
    console.log("✅ Conectado a MongoDB Atlas");

    // Probar la conexión con ping
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");

    // Definir una ruta básica
    app.get("/", (req, res) => {
      res.send("🚀 Servidor Express corriendo y conectado a MongoDB Atlas");
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1);
  }
}

startServer();
