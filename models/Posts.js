const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [{
    content: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    creator: {
      type: String,
      required: true
    }
  }],
  creator: {
    type: String,
    required: true
  },
  release_year: {
    type: String
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
