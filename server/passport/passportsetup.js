const DB = require('../models/database'); 
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const jwtSecret = require('./jwtconfig');

const JWTStrategy = passportJWT.Strategy;


const { secret } = require('./keys');

passport.use(new LocalStrategy({
      userNameField: userName,
      passwordField: password,
    }, async (username, password, done) => {
      try { 
        const param = [userName];
        const response = await DB.async(`SELECT password FROM users WHERE username = ($1);`, param)
        console.log(response);
        const hashedPassword = response.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword)
      
        if (passwordMatch) {
          return done(null, response)
        } else {
          return done('Incorrect Username / Password');
        }
       } catch (error) {
         done(error)
       }
     }));

     passport.use('jwt', new JWTStrategy(opts, (jwt_payload, done) => {
       
     }
      secretOrKey: secret,
    }, (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
      }
      return done(null, jwtPayload);
    }))



  //   login: (req, res, next) => {
  //     const {userName, password } = req.body;
  //     const param = [userName];
  //      DB.query(`SELECT password FROM users WHERE username = ($1);`, param, (err, data) => {
  //       if (err) {
  //         console.log(err);
  //         return next(err);
  //       } else {
  //         const hashedPassword = data.rows[0].password;
  //         res.locals.password = hashedPassword;
  //         bcrypt.compare(password, res.locals.password)
  //         .then((res) => {
  //           if (res) return next();
  //           else console.log('password not in database');
  //         });
  //     }
  //   });
  //   },
  // }