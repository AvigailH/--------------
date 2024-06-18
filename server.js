const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const toysRouter = require('./routes/routerToys');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/toys', toysRouter);

app.listen(3003, () => {
  console.log(`Server listening on port ${3003}`);
});