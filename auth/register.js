const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
  })
  async function register(req, res) {
    try {
        const { name, email, pass } = req.body;
        const check = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (check.rows.length > 0) {
            res.status(403).json({ message: 'User using this email already exists' });
        } else {
            const password = await bcrypt.hash(pass, 5);
            const insert = await pool.query('INSERT INTO users (name, email, pass) VALUES ($1, $2, $3)', [name, email, password]);

            if (!insert) {
                res.status(403).json({ message: 'Invalid' });
            } else {
                req.session.user =  email; // Fix here: use req.session.user.email
                req.session.save(() => {
                    console.log(req.session)
                })
                res.status(200).json({ message: 'OK', user: req.session.user });
                console.log(`${req.session.user.email} registered`); // Fix here: use req.session.user.email
            }
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = register