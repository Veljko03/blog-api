const pool = require("./pool");

async function createUserTest(name) {
  const result = await pool.query(
    "INSERT INTO users (user_name) VALUES ($1) RETURNING *",
    [name]
  );

  return result.rows[0];
}

async function createPost(title, content, userID) {
  const result = await pool.query(
    "INSERT INTO post (title,post_text,user_id) VALUES ($1,$2,$3) RETURNING *",
    [title, content, userID]
  );

  return result.rows[0];
}

async function getPosts() {
  const result = await pool.query("SELECT * FROM post");

  return result.rows;
}

module.exports = { createPost, createUserTest, getPosts };
