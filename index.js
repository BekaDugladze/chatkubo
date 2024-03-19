const express = require('express');
require('./passport');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv').config();
const pgSession = require('connect-pg-simple')(session);
const {Pool} = require('pg');
const login = require('./auth/login');
const register = require('./auth/register');
const user = require('./user/user');
const {handleChat, getMessage} = require('./user/chat');
const latests = require('./user/latest');

const app = express();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
  })


app.use(session({
    secret: 'chatapp', 
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600 * 24 * 24 * 1,
      sameSite: true,
      secure: false,
      httpOnly: true,
    },
    store: new pgSession({pool})
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET, POST, PUT, DELETE',
        credentials: true,
    })
)

app.get('/', (req, res, next) => {
    res.send('<a href="/auth/google">google</a>');
})

app.post('/login', login);
app.get('/login', (req, res) => {
    res.send(req.session)
})
app.post('/register', register);
app.get('/register', (req, res) => {
    res.send('Maybe its ok')
});

app.get('/user', user)

app.post('/chat', handleChat)
app.get('/chat', (req, res) => {
  res.send('Maybe its ok')
});

app.get('/chat/messages',  getMessage)

app.get('/chat/allLast', latests)

//Google Login

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:3000/chat',
        failureRedirect: '/auth/google'
}));

app.get('/profile',  async (req, res) => {
    try {
        if (req.user) {
            const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [req.user.email]);
            if (checkUser.rows.length === 0) {
                await pool.query('INSERT INTO users (name, email, picture) VALUES ($1, $2, $3)', [req.user.displayName, req.user.email, req.user.picture]);
            }
          // If req.user exists, respond with user details from req.user
          res.status(200).json({
            user: req.user.displayName,
            email: req.user.email,
            picture: req.user.picture,
            id: checkUser.rows[0].id
          });
        } 
        else if (req.session)  {
            const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [req.session.user]);
            
          if (userResult.rows.length > 0) {
            // If user details are found in the database, respond with the retrieved details
            const result = userResult.rows[0];
            res.status(200).json({
              user: result.name,
              email: result.email,
              picture: result.picture,
            });
          } else {
            // If no user details are found, respond with an appropriate status and message
            res.status(404).json({ error: 'User not found' });
          }
        }
        else{
            res.status(404).json({ message: 'Not Authorized' });
        }
      } catch (error) {
        // Handle any errors that might occur during the database query
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

app.post('/profile', async (req, res) => {
    try{
    const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [req.user.email]);
    if (checkUser.rows.length === 0) {
        await pool.query('INSERT INTO users (name, email, picture) VALUES ($1, $2, $3)', [req.user.displayName, req.user.email, req.user.picture]);
    }
    }
    catch (e) { 
        console.error(e);
    }
})

app.get('/database', async (req, res) => {
    const db = await pool.query('SELECT * FROM users')
    res.status(200).json(db.rows);
})




app.get('/logout', (req, res) => {
    req.session.destroy(); // Destroy the session
    res.redirect('/')
})

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});