const { Pool } = require('pg');
const URI = 'postgres://kxgsvnke:V527n_xGglpQE4RmslL4eKE98ZBn4F3d@salt.db.elephantsql.com:5432/kxgsvnke'; 
const pool = new Pool({ connectionString: URI}); 

const userQueryString = (`CREATE TABLE IF NOT EXISTS users
    (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR (255) NOT NULL UNIQUE,
    password VARCHAR (255) NOT NULL UNIQUE,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL
  );
`); 

const bookQueryString = (`CREATE TABLE IF NOT EXISTS books
  (
  id SERIAL PRIMARY KEY NOT NULL,
  isbn VARCHAR (255) NOT NULL UNIQUE,
  book_title VARCHAR (255) NOT NULL,
  author VARCHAR (255) NOT NULL,
  genre VARCHAR (255) NOT NULL,
  year_published VARCHAR (255) NOT NULL,
  language VARCHAR (255),
  medium VARCHAR (255),
  publisher VARCHAR (255)
  );
`); 

const bookShelfQueryString = (`CREATE TABLE IF NOT EXISTS book_shelf 
  (
    id SERIAL PRIMARY KEY NOT NULL,
    book_id INT REFERENCES books (id) ON DELETE CASCADE,
    shelf_id INT REFERENCES shelf (id) ON DELETE CASCADE
  );
`); 

const shelfQueryString = (`CREATE TABLE IF NOT EXISTS shelf 
  (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users (id) ON DELETE CASCADE NOT NULL,
  shelf_name VARCHAR (255) NOT NULL UNIQUE,
  shelf_description VARCHAR (255)

  );
`); 

const userBooksQueryString = (`CREATE TABLE IF NOT EXISTS user_books
  (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users (id) ON DELETE CASCADE,
  book_id INT REFERENCES books (id) ON DELETE CASCADE,
  rating INT,
  review VARCHAR (255),
  status VARCHAR (255) NOT NULL
  );
`); 


;(async () => {
  const client = await pool.connect()
  try {
    const userBookQuery = await client.query(userBooksQueryString);
    const shelfQuery = await client.query(shelfQueryString);
    const bookShelfQuery = await client.query(bookShelfQueryString);
    const bookQuery= await client.query(bookQueryString);
    const userQuery = await client.query(userQueryString);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release()
  }
})().catch((e) => {
  console.log(e.stack)
})


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },

  async: pool.query(),

  
};
	
