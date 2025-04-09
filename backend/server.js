const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/appConfig.js');
const routes = require('./routes/apiRoutes.js');

const app = express();

mongoose.connect(config.mongoURI, config.mongoOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
