const { config } = require("dotenv");
config();
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT ;
const connectDB = require("./config/db");
connectDB();
// Middleware
app.use(cors());
app.use(bodyParser.json());


const authRoutes = require("./routes/authRoutes")
app.use('/api', authRoutes);
const eventRoutes = require("./routes/eventRoutes")
app.use('/event',eventRoutes);
const adminRoutes = require("./routes/adminRoutes")
app.use('/admin',adminRoutes);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));



app.post('/api/signup', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});