const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
  })

  async function handleChat(req, res) {
    try{
        const senderEmail = req.user.email || req.session.user;
        const getSender = await pool.query('SELECT id FROM users WHERE email = $1', [senderEmail])

        const recieverEmail = req.body.recieverEmail;
        const getReciever = await pool.query('SELECT id FROM users WHERE email = $1', [recieverEmail]);

        const message = req.body.text

        if(getSender.rows.length > 0 && getReciever.rows.length > 0 && message !== ''){
            const sender = getSender.rows[0].id;
            const reciever = getReciever.rows[0].id;
            const now = new Date();

            await pool.query('INSERT INTO chat (sender, recipient, message, timestamp) VALUES ($1, $2, $3, $4)', [sender, reciever, message, now])
            
        
            res.status(200).json({success: 'sss'})
        }
        else{
            res.status(400).json({message: 'something went wrong'})
        }
    }
    catch(err){
        console.log(err);
    }
  }

  async function getMessage(req, res) {
    try{
    const senderEmail = req.user.email || req.session.user;
    console.log(senderEmail);
    const getSender = await pool.query('SELECT id FROM users WHERE email = $1', [senderEmail])

    const recieverEmail = req.query.userEmail;
    const getReciever = await pool.query('SELECT id FROM users WHERE email = $1', [recieverEmail]);
    if(getSender.rows.length > 0 && getReciever.rows.length > 0 ){
        const sender = getSender.rows[0].id;
        const reciever = getReciever.rows[0].id;

        if(sender !== reciever){
        const getSent = await pool.query('SELECT message, timestamp FROM chat WHERE (sender = $1 AND recipient = $2) ', [sender, reciever])
        
        const getRecieved = await pool.query('SELECT message, timestamp FROM chat WHERE (sender = $2 AND recipient = $1) ' , [sender, reciever])
        
        /*const senderPicture = req.user.picture || (getSender.rows.length > 0 ? getSender.rows[0].picture : null);
        const receiverPicture = getReciever.rows[0].picture*/ 
        
        const send = getSent.rows.map(row => ({ ...row, senderEmail }));
        const got = getRecieved.rows.map(row => ({ ...row, recieverEmail }));

        const allMessages = [...send, ...got,];
        
        const parseTimestamp = (timestampString) => {
            const timestamp = new Date(timestampString);
            return timestamp.toLocaleString()
        };
        
        allMessages.forEach(message => {
            message.timestamp = parseTimestamp(message.timestamp);
        });
        
        allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));


        res.status(200).json({messagges: allMessages,});
        }
        else{
            const getSent = await pool.query('SELECT message, timestamp FROM chat WHERE (sender = $1 AND recipient = $2) ORDER BY timestamp', [sender, reciever])
            const send = getSent.rows.map(row => ({ ...row, senderEmail }));
            const allMessages = [...send];
            allMessages.sort((a, b) => a.timestamp - b.timestamp);
            res.status(200).json({messagges: allMessages,});
        }
    }
    else{
        res.status(400).json({message: 'something went wrong'})
    }
    }
    catch(err){
        console.log(err)
    }
};

  module.exports = {
    handleChat: handleChat,
    getMessage: getMessage,
  }