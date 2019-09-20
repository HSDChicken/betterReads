const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/usercontroller');
const booksController = require('../controllers/booksController')

router.post('/signup', authController.signup, (req, res) => {
  res.status(200).send(res.locals.user);
});

router.get('/details', userController.getProfileDetails, (req, res) => {
  res.status(200).send(res.locals.allUsers);
});

router.post('/login', authController.login, (req, res) => {
  res.status(200).send('User Logged In');
});

router.post('/shelf', userController.getUserID, userController.addShelf, (req, res) => {
  res.status(200).send(res.locals.shelf);
});

router.delete('/shelf', userController.deleteShelf, (req, res) => {
  res.status(200).send("Shelf Deleted");
});

router.post('/book', booksController.testDatabase, (req, res) => {
  res.status(200).semd(res.locals.book);
});

router.post('/bookshelf', booksController.putBookOnShelf, (req, res) => {
  res.status(200).semd(res.locals.bookshelf);
});

router.post('/review', userController.getUserID, userController.addBookReview, (req, res) => {
  res.status(200).send(res.locals.bookReview);
});

router.post('/status', userController.getUserID, userController.addStatus, (req, res) => {
  res.status(200).send(res.locals.bookReview);
});

router.post('/rating', userController.getUserID, userController.addRating, (req, res) => {
  res.status(200).send(res.locals.bookReview);
});


module.exports = router;