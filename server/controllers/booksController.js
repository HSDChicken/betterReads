const fetch = require('node-fetch');
const { googleBooksAPI } = require('../secret.js');
const DB = require('../models/database');
// Bconst userName = require('../secret');
const booksController = {};

// booksController.addBookByAuthor = (req, res, next) => {
//     // helper function to split the sting in to first and last name
//     console.log('In the beginning of the add books by author middleware')
//     function findNames(string) {
//         string.toLowerCase();
//         const newNames = string.toLowerCase().split(' ');
//         return {
//             firstName: newNames[0],
//             lastName: newNames[1],
//         };
//     }
//     // passing in the string that comes from the front end
//     // const names = findNames(req.body.author);
//     //const firstName = names.firstName;
//     // const lastName = names.lastName;
//     const firstName = 'Stephen';
//     const lastName = 'King';
//     console.log(`About to make a fetch request with th the last name ${lastName}`)
//     console.log(googleBooksAPI.key);
//     // API call to retrieve the books by the author
//     fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${lastName}${firstName}&key=${googleBooksAPI.key}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         for(let i = 0; i < data.length; i++){
//             res.locals.isbn = data[i].industryIdentifiers[1].identifier;
//             res.locals.title = data[i].title;
//             res.locals.author = data[i].author;
//             res.local.genre = data[i].categories;
//             res.locals.published = data[i].publishedDate;
//             res.locals.language = data[i].language;
//             res.locals.medium = data[i].printType;
//             res.locals.publisher = data[i].publisher;
//         }
//     });
//     console.log('made it through the middleware')
// };

booksController.addBookByTitle = async (req, res, next) => {
    /* onst apiData = async function 
    make the fetch request 
    return await const data; 
    */
    // const title = req.body.title;
    const title = 'harry potter and the chamber of secrets';
    // API call to retrieve the books by the title
    try{
    let results = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle${title}&key=${googleBooksAPI.key}`)
     results = await results.json()
        // console.log(results.items)
        res.locals.allTheData = results.items;
        console.log(res.locals.allTheData)
        createBooks(res.locals.allTheData)
    } catch (e){
        next({
            log: `There was an issue in the booksContoller.addBookByAuthor: ERROR: ${typeof e === 'object' ? e : e}`,
            message: {err: 'That bookController is causing me problems AGAIN'}
        });
    }

    function createBooks (booksData) {
        let bookResults = [];
        for(let i = 0; i < booksData.length - 1; i++){
            let tempBooks ={};
            if(booksData[i] !== undefined){
                tempBooks = {
                    title: booksData[i].volumeInfo.title || undefined, 
                    author: booksData[i].volumeInfo.authors || undefined,
                    publisher: booksData[i].volumeInfo.publisher || undefined,
                    published: booksData[i].volumeInfo.publishedDate || undefined,
                    // isbn: (booksData[i].volumeInfo.industryIdentifiers[1].identifier || undefined),
                    genre: booksData[i].volumeInfo.categories || undefined,
                    medium: booksData[i].volumeInfo.printType || undefined,
                    language: booksData[i].volumeInfo.language || undefined, 
                 };
                if(booksData[i].volumeInfo.industryIdentifiers[1]){
                    tempBooks.isbn = (booksData[i].volumeInfo.industryIdentifiers[1].identifier || undefined);
                } else {
                    tempBooks.isbn = undefined;
                }
                 console.log(i)
                 console.log(tempBooks) 
                 bookResults.push(tempBooks) 
            } else if (booksData[i] === undefined){
                tempBooks = {}
            }
        }
        res.locals.bookResults = bookResults;
        console.log(res.locals.bookResults)

    }
    
};

booksController.testDatabase = (req, res, next) => {
    const {isbn, bookTitle, author, genre, yearPublished, language, medium, publisher} = req.body; 
    console.log(bookTitle)
    const params = [isbn, bookTitle, author, genre, yearPublished, language, medium, publisher]
    DB.query(`INSERT INTO books (
        isbn, book_title, author, genre, year_published, language, medium, publisher
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *;`, params, (err, data) => {
        if (err) {
          console.log(err)
          return next({log: { where: "Check books", message: err}});
        } else {
          const book = data.rows;
          console.log(book);
          res.locals.book = book;
          return next()
        }
      })
};

booksController.putBookOnShelf = (req, res, next) => {
    const {bookID, shelfID} = req.body;
    const params = [bookID, shelfID]; 
    DB.query(`INSERT INTO book_shelf (book_id, shelf_id) VALUES ($1, $2) returning *;`, params, (err, data) => {
        if (err) {
          return next({log: { where: "Check bookONSHelf", message: err}});
        } else {
          const bookShelf = data.rows;
          res.locals.bookshelf = bookShelf;
          console.log(res.locals.bookshelf)
          return next()
        }
      });
};

module.exports = booksController;