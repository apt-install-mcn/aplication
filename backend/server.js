const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Conectar a MongoDB
const uri = 'mongodb+srv://funcoadee:FDwcSoGqyKgLM514@funcoadee.0wmy20w.mongodb.net/ ';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Enviar testimonio a MongoDB
app.post('/enviar-testimonio', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, email, testimonio } = req.body;
    const imagen = req.file.filename;

    const db = client.db('blog');
    const collection = db.collection('blog-post');

    // Almacena el testimonio en MongoDB
    await collection.insertOne({ nombre, email, testimonio, imagen });

    console.log('Nuevo testimonio recibido:');
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Testimonio:', testimonio);
    console.log('Imagen:', imagen);

    res.status(200).send('Testimonio recibido con éxito');
  } catch (error) {
    console.error('Error al procesar el testimonio:', error);
    res.status(500).send('Error al procesar el testimonio');
  }
});

// Obtener testimonios de MongoDB
app.get('/testimonios', async (req, res) => {
  try {
    const db = client.db('blog');
    const collection = db.collection('blog-post');

    // Recupera los testimonios desde MongoDB
    const testimonios = await collection.find().toArray();

    res.status(200).json(testimonios);
  } catch (error) {
    console.error('Error al obtener los testimonios:', error);
    res.status(500).send('Error al obtener los testimonios');
  }
});

// Ruta para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
