const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name VARCHAR(255),
    google_id VARCHAR(255),
    email VARCHAR(100)  UNIQUE,
    is_admin BOOLEAN DEFAULT FALSE,
    password_hash VARCHAR(255)  
);

CREATE TABLE post (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    post_text TEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE comment (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    comment_text TEXT NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE likes (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post (id) ON DELETE CASCADE
);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    //connectionString: process.env.DATABASE_URL,
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
  });

  await client.connect();
  console.log("daaaa..");
  await client.query(SQL);
  console.log("raaaaa..");
  await client.end();
  console.log("done");
}

main();
