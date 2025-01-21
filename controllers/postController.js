const { use } = require("passport");
const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {
  const { title, content, userID } = req.body;

  const post = await db.createPost(title, content, userID);
  res.json(post);
});

const getPosts = asyncHandler(async (req, res) => {
  const allPosts = await db.getPosts();
  const user = req.user;

  //const result = { ...allPosts, user };

  res.json(allPosts);
});

const getPostsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await db.getPostsById(id);
  const comments = await db.getCommentsForPost(id);
  const userId = req.user;
  console.log(req.user);

  const result = { ...post, comments, userId };

  res.json(result);
});

const deletePostById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await db.deletePostById(id);
  res.json(post);
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const post = await db.updatePost(title, content, id);
  res.json(post);
});

//LIKE
const likePost = asyncHandler(async (req, res) => {
  const { userID } = req.body;
  const { id } = req.params;

  const like = await db.likePost(id, userID);
  const post = await db.getPostsById(id);
  console.log(userID);
  console.log(post);
  res.json(post);
});

//COMMENTS
const createComment = asyncHandler(async (req, res) => {
  const { userID, text } = req.body;
  const postID = req.params.id;
  console.log("post id ", postID, " user id=", userID, " text=", text);

  const comment = await db.createComment(text, postID, userID);
  console.log(comment, " comment");

  if (!comment) {
    res.status(404).send("Cant create Comment");
  }
  res.json(comment);
});

module.exports = {
  createPost,
  getPosts,
  getPostsById,
  deletePostById,
  updatePost,
  likePost,
  createComment,
};
