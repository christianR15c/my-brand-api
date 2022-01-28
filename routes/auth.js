const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  signupValidation,
  loginValidation,
} = require('../controllers/validation');

router.post('/register', async (req, res) => {
  // validating inputs (name, email and password)
  const { error } = signupValidation(req.body);
  if (error)
    return res.status(400).json({ messsage: error.details[0].message });

  // checking if the user is already in database
  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist)
    return res.status(400).json({ message: 'Account already exists' });

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: false,
  });
  user
    .save()
    .then((user) => res.json({ user }))
    .catch((err) => {
      res.status(400).json(err);
      console.log(err);
    });
});

router.post('/login', async (req, res) => {
  // validating inputs (name, email and password)
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // checking if a user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: `user doesn't exists` });

  // checking if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: 'Invalid password' });

  // creating a token
  let token = jwt.sign({ _id: user._id }, `${process.env.SECRET_TOKEN}`);

  // checking if user is admin
  if (user.isAdmin) {
    let adminToken = jwt.sign({ _id: user._id }, `${process.env.ADMIN_TOKEN}`);
    return res.header('auth-token', adminToken).json({
      adminToken,
      user,
    });
  }

  res.header('auth-token', token).header('isAdmin', false).json({
    user,
    token,
  });
});

module.exports = router;
