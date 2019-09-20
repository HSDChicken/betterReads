const DB = require('../models/database'); 
const bcrypt = require('bcrypt');

const authController = {

signup: (req, res, next) => {
  const { userName, password, firstName, lastName, email} = req.body;
  bcrypt.hash(password, 10, function(err, hash) {
    const params = [userName, hash, firstName, lastName, email]
    DB.query('INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5) returning *;', params, (err, data) => {
      if (err) {
        return next(err);
      } else {
        const item = data.rows[0];
        res.locals.user = item;
        return next();
      }
    })
  });
},

login: (req, res, next) => {
    const {userName, password } = req.body;
    const param = [userName];
     DB.query(`SELECT password FROM users WHERE username = ($1);`, param, (err, data) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        const hashedPassword = data.rows[0].password;
        res.locals.password = hashedPassword;
        bcrypt.compare(password, res.locals.password)
        .then((res) => {
          if (res) {
            res.cookie('token', 'youareloggedin')
            return next();
          } else console.log('password not in database');
        });
    }
  });
  },

  checkCookie: (req, res, next) => {
  const error = 'You must be signed in to view this page';
  if (req.cookies.token === 'youareloggedin') {
      return next();
    } else {
      return next(error);
    }
  },
}



module.exports = authController;
