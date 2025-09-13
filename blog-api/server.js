const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/database');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', require('./src/users/routes'));
app.use('/api/posts', require('./src/posts/routes'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
});
