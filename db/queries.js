const pool = require("./pool");
const asynchHandler = require("express-async-handler");
//USERS
const createNewUser = asynchHandler(async (email, username, hashedPassword) => {
  const result = await pool.query(
    "INSERT INTO users (email,user_name,password_hash) VALUES ($1,$2,$3) RETURNING *",
    [email, username, hashedPassword]
  );

  return result.rows[0];
});
async function getUserByEmail(email) {
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return user.rows[0];
}

async function getUserById(id) {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return user.rows[0];
}
//POSTS
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

async function getPostsById(id) {
  const result = await pool.query(
    "SELECT post.id, post.title, post.post_text, post.user_id, post.created_at, post.is_published,COUNT(likes.id) as num_Of_likes FROM post LEFT JOIN likes on post.id=likes.post_id  where post.id=$1 GROUP BY post.id",
    [id]
  );

  return result.rows[0];
}

async function deletePostById(id) {
  const result = await pool.query("DELETE  FROM post where id=$1 RETURNING *", [
    id,
  ]);

  return result.rows[0];
}

async function updatePost(title, content, id) {
  const result = await pool.query(
    "UPDATE post SET title=$1 , post_text=$2 where id=$3 RETURNING *",
    [title, content, id]
  );

  return result.rows[0];
}
//LIKES
async function likePost(post_id, user_id) {
  const check = await pool.query(
    "SELECT * FROM likes WHERE post_id=$1 AND user_id=$2",
    [post_id, user_id]
  );
  if (check.rowCount > 0) {
    const result = await pool.query(
      "DELETE FROM likes WHERE post_id=$1 AND user_id=$2 RETURNING *",
      [post_id, user_id]
    );
    console.log("Deleted like");

    return result.rows[0];
  } else {
    const result = await pool.query(
      "INSERT INTO likes (post_id, user_id) VALUES ($1, $2) RETURNING *",
      [post_id, user_id]
    );
    console.log("added like");

    return result.rows[0];
  }
}

//COMMENTS
async function createComment(text, postID, userID) {
  const result = await pool.query(
    "INSERT INTO comment (comment_text,post_id,user_id) VALUES ($1,$2,$3) RETURNING *",
    [text, postID, userID]
  );

  return result.rows[0];
}

async function getCommentsForPost(postID) {
  const result = await pool.query(
    "SELECT * FROM comment where post_id=$1 ORDER BY created_at DESC",
    [postID]
  );

  return result.rows;
}

module.exports = {
  createPost,
  createNewUser,
  getPosts,
  getPostsById,
  deletePostById,
  updatePost,
  likePost,
  createComment,
  getCommentsForPost,
  getUserByEmail,
  getUserById,
};
