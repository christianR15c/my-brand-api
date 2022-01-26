const router = require('express').Router();
const ContactUs = require('../models/ContactUs');
const verify = require('../controllers/verifyToken');
const { contactUsValidation } = require('../controllers/validation');

// sending a query or contacting us
router.post('/post', verify, (req, res) => {
  const { error } = contactUsValidation(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const contactUs = new ContactUs(req.body);
  contactUs
    .save()
    .then((query) => res.send(query))
    .catch((err) => console.log(query));
});

// displaying all queries
router.get('/queries', (req, res) => {
  ContactUs.find()
    .sort({ createdAt: -1 })
    .then((queries) => res.send(queries))
    .catch((err) => console.log(err));
});

// delete a query
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  ContactUs.findByIdAndDelete(id)
    .then((query) =>
      res.send(`a query of ${query.name} is successfuly deleted`)
    )
    .catch((err) => console.log(err));
});

module.exports = router;
