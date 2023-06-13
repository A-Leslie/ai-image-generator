const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./db/dbconn')
const postRoutes = require('./routes/postRoutes')
const appRoutes= require('./routes/appRoutes.js')

//pull env variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/app', appRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from Pic.Generator!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();