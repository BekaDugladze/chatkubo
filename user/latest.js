const { Pool } = require('pg');
require('../auth/login');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
  })

const latests = async (req, res) => {
    try{
        const userEmail = req.query.email;
        const id = await pool.query('SELECT * FROM users WHERE email = $1', [userEmail])
        const userId = id.rows[0].id

        const chats = await pool.query('SELECT sender, recipient, timestamp FROM chat WHERE sender = $1 OR recipient = $1 ORDER BY timestamp DESC', [userId])
        const uniqueNumbersSet = new Set();
        const parseTimestamp = (timestampString) => {
            const timestamp = new Date(timestampString);
            return timestamp.toLocaleString()
        };
        
        chats.rows.forEach(message => {
            message.timestamp = parseTimestamp(message.timestamp);
        });
        
        const sortedChats = chats.rows.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        // Extract unique sender and recipient numbers
        sortedChats.forEach(chat => {
            uniqueNumbersSet.add(chat.sender);
            uniqueNumbersSet.add(chat.recipient);
        });

        const uniqueNumbersArray = Array.from(uniqueNumbersSet).map(Number);

        const getLatest = await pool.query('SELECT * FROM users WHERE id = ANY($1) ORDER BY ARRAY_POSITION($1, id)', [uniqueNumbersArray]) 
        res.status(200).json(getLatest.rows)
    }
    catch(err){
        console.error(err);
    }
}

module.exports = latests