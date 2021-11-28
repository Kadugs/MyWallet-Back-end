import connection from '../database.js';

async function findByEmail(email) {
  const result = await connection.query(
    `
    SELECT * FROM users
    WHERE email = $1
  `,
    [email],
  );

  return result?.rows[0];
}

async function getEmailList() {
  const emailList = await connection.query('SELECT email FROM users;');
  return emailList.rows;
}
async function addNewUser({ name, email, password }) {
  const newUser = await connection.query(
    `
            INSERT INTO users 
            (name, email, password) 
            VALUES ($1, $2, $3)
            RETURNING *`,
    [name, email, password],
  );
  return newUser.rows[0];
}

export { findByEmail, getEmailList, addNewUser };
