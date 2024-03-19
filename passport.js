const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv').config();
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var YahooStrategy = require( 'passport-yahoo-oauth' ).Strategy;
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


const app = express();

passport.use(new GoogleStrategy({
    clientID:     '705267653150-4ss8ck9bgaqn0m8pkcun7m61al6ltr02.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:1000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    try {
        // If user already exists, return the profile
        return done(null, profile);
    } 
    catch (err) {
      console.error(err);
      return done(err, null); // Handle errors by passing them to the done callback
    }
  }
));


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})