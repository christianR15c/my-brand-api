const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token)
    return res
      .status(400)
      .send('Access Denied!, Only Admin can perform this task');

  try {
    const verified = jwt.verify(token, `${process.env.ADMIN_TOKEN}`);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
