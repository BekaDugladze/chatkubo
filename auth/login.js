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

  async function login(req, res, next) {
    try {
        const {pass, email} = req.body;
        const checkEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = checkEmail.rows[0];

        if (!user) {
            res.status(403).json({ message: 'User not found' });
        } else {
            const passwordMatch = await bcrypt.compare(pass, user.pass);
            
            if (!passwordMatch) {
                res.status(403).json({ message: 'Password mismatch' });
            } else {
                req.session.user = user.email;
                req.session.save(() => {
                    console.log(req.session);
                });
                res.status(200).json({ message: user });
            }
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = login