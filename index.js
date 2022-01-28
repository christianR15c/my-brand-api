const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/auth');
const articleRouter = require('./routes/articles');
const contactRouter = require('./routes/contactUs');

dbURI =
  'mongodb+srv://christian:David15maso@atlp-capstone-project.goro3.mongodb.net/my-brand?retryWrites=true&w=majority';
// connect to databse
mongoose.connect(dbURI, () => {
  console.log('connected to databse');
});

// middlewares
app.use(cors());
app.use('/images', express.static('images'));
app.use(bodyParser.json());

// Route middlewares
app.use('/api/user', authRouter);
app.use('/api/articles', articleRouter);
app.use('/api/contact', contactRouter);
app.listen(process.env.PORT || 9000, () => console.log('listening to port'));
