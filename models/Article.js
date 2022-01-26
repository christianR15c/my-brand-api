const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  articleImage: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [
    {
      text: String,
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
