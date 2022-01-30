const Article = require('../models/Article');
const { commentValidation } = require('../controllers/validation');

// creating an article
const create_article = (req, res) => {
  // Creating new article
  let article;
  if (req.file) {
    article = new Article({
      title: req.body.title,
      content: req.body.content,
      articleImage: req.file.path,
    });
  } else {
    article = new Article({
      title: req.body.title,
      content: req.body.content,
    });
  }

  article.save().then((article) =>
    res.json({
      status: 'saved successfuly',
      article,
    })
  );
};
const update_article = (req, res) => {
  const id = req.params.id;
  Article.findByIdAndUpdate(id, req.body)
    .then((article) => res.json({ article }))
    .catch((err) => console.log(err));
};

const delete_article = (req, res) => {
  const id = req.params.id;
  Article.findByIdAndDelete(id)
    .then((article) =>
      res.json({
        message: `article deleted successfully`,
      })
    )
    .catch((err) => console.log(err));
};

const gett_all_article = (req, res) => {
  Article.find()
    .sort({ createdAt: -1 })
    .then((result) => res.json({ result }))
    .catch((err) => console.log(err));
};

const get_single_article = (req, res) => {
  const id = req.params.id;
  Article.findById(id)
    .then((result) =>
      res.json({
        status: 'success',
        result,
      })
    )
    .catch((err) => console.log(err));
};

const comment_article = (req, res) => {
  // validating comment
  const { error } = commentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const comment = {
    text: req.body.text,
    postedBy: req.user,
  };
  Article.findByIdAndUpdate(id, {
    $push: { comments: comment },
  })
    .populate('comments.postedBy', 'name')
    .then((article) =>
      res.json({
        status: 'successfully updated',
        article,
      })
    )
    .catch((err) => console.log(err));
};

module.exports = {
  create_article,
  update_article,
  delete_article,
  gett_all_article,
  get_single_article,
  comment_article,
};
