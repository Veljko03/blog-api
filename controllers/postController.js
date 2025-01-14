const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const createPost = asyncHandler(async (req, res) => {
  const { title, content, userID } = req.body;

  const post = await db.createPost(title, content, userID);
  res.json(post);
});

const getPosts = asyncHandler(async (req, res) => {
  const allPosts = await db.getPosts();
  res.json(allPosts);
});

const getPostsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await db.getPostsById(id);
  res.json(post);
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

module.exports = {
  createPost,
  getPosts,
  getPostsById,
  deletePostById,
  updatePost,
};
