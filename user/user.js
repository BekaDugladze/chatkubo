const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
  })

  async function userSearch(req, res, next) {
    try{
        const email = req.query.email
        if (email.length === 0) {
            // If email is empty, return an empty array
            return res.status(200).json([]);
        }
        const user = await pool.query('SELECT name, email, picture FROM users WHERE email LIKE $1', [email])
        
        const result = user.rows.map((row) => ({name: row.name, picture: row.picture, email: row.email}))
        if(user.rows.length === 0){
            res.status(404).json({result})
        }
        else{
            res.status(200).send(result)
        }
    }
    catch(err){
        console.log(err);
    }
  }

 module.exports = userSearch