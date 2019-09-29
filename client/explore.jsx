import React, {useContext, useState} from 'react';
import BookContext from './bookContext';
import Book from './book.jsx';
//dynamically render books

function Explore(props){
  const [bookTitle, setBookTitle] = useState('');

  const books = useContext(BookContext).bookList;
  const booksArray = [];
  for (let i = 0; i < books.length; i++){
    let book = books[i];
    booksArray.push(
      <Book img={book.image}
      title={book.title} author={book.author}
      published={book.published}
      genre={book.genre}
      summary={book.summary}
      key={`book-${i}`}
      />
    )
  }

  return (
    <div id="explore-container">
      <div id="explore-search">
        <label htmlFor="explore-field" className="text">Book Title</label>
        <input type="text" placeholder="Book Title..." className="input-field" id="explore-field"/>
        <button className="button" id="explore-button">Submit</button>
      </div>
      <div id="explore-results">
        {booksArray}
      </div>
    </div>
  )
}

export default Explore;