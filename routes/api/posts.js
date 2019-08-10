const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Post Model
const Post = require('../../models/Posts');

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

// @route   POST api/posts
// @desc    Create A Post
// @access  Public
router.post('/', auth, (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    desc: req.body.desc,
    img: req.body.img,
    comments: [],
    creator: req.body.creator,
    release_year: req.body.release_year
  });

  newPost.save().then(post => res.json(post));
});

// @route   GET api/posts/:id
// @desc    Get Specific Post
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
});

// @route   POST api/posts/:id
// @desc    Create a comment
// @access  Public
router.post('/:id', auth, (req, res) => {
  const comment = {content: req.body.content, creator: req.body.creator};
  Post.findById(req.params.id).then((post) => {
    post.comments.unshift(comment);
    post.save().then(post => res.json(post));
  });
});

// @route   DELETE api/posts/:id
// @desc    Delete A Post
// @access  Private
router.delete('/:id', auth, (req, res) => {
  Post.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success:false}));
});

// @route   DELETE api/:postid/:commentid
// @desc    Delete A Comment
// @access  Private
router.delete('/:postid/:commentid', auth, (req, res) => {
  Post.findByIdAndUpdate(
    req.params.postid,
    { $pull: { comments : {_id: req.params.commentid} } }
  )
    .then(() => res.json({success:true}))
    .catch(err => res.status(404).json({success:false}));
});

module.exports = router;
