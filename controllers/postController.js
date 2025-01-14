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

module.exports = { createPost, getPosts };
