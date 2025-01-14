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

async function getPostsById(id) {
  const result = await pool.query("SELECT * FROM post  where id=$1", [id]);

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

module.exports = {
  createPost,
  createUserTest,
  getPosts,
  getPostsById,
  deletePostById,
  updatePost,
  likePost,
};
