import React, {useState} from 'react';
import NavBar from './navbar.jsx';
import SignIn from './signIn.jsx';
import SignUp from './signUp.jsx';
import Explore from './explore.jsx';
import Profile from './profile.jsx';
import {Route, Switch, Redirect} from 'react-router-dom';
import {UserProvider} from './userContext';
import {BookProvider} from './bookContext';
import styles from './main.scss';

const App = (props) => {
  // use state to pass onto the provider
  const [username, setUsername] = useState('');
  const [shelves, setShelves] = useState([{
    name: 'Thrillers',
    books: [{
      title: 'It',
      author: 'Stephen King',
      published: 1986,
      genre: 'Thriller',
      summary: 'The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears and phobias of its victims to disguise itself while hunting its prey.'
    }]
  }, {
    name: 'To Read',
    books: [{
      title: 'Everything is Illuminated',
      author: 'Jonathan Safran Foer',
      published: 2002,
      genre: 'Magical Realism',
      summary: 'A young Jewish-American man obsessed with his family history, Jonathan Safran Foer decides to journey to the Ukraine to find out more about the life of his grandfather.'
    }]
  }]); 
  const [isLoggedIn, setLoggedIn] = useState(false);
  
  const addShelves = (shelves) => {
    setShelves(shelves);
  }
  const addUsername = (username) => {
    setUsername(username);
  }
  const addShelf = (shelfObj) => {
    setShelves([...shelves, shelfObj]);
  }
  
  const [bookList, setBookList] = useState([{
    title: 'It',
    author: 'Stephen King',
    published: 1990,
    genre: 'Thriller',
    summary: 'The story follows the experiences of seven children as they are terrorized by an evil entity that exploits the fears and phobias of its victims to disguise itself while hunting its prey.'
  }, {
    title: 'Everythign is Illuminated',
    author: 'Jonathan Safran Foer',
    published: 2004,
    genre: 'Magical Realism',
    summary: 'A young Jewish-American man obsessed with his family history, Jonathan Safran Foer decides to journey to the Ukraine to find out more about the life of his grandfather.'
  }]);

  const addBookToBookList = (book) => {
    setBookList([...bookList, book]);
  }
  
  return(

    <div>
      <NavBar/>
      <div className="main-container">
      <UserProvider value={{ username, shelves, addUsername, addShelves, addShelf, setLoggedIn }}>
        <Route exact path = '/' render={(props) => (
        isLoggedIn ? (
        <Redirect to='/profile' />
          ) : (
        <SignIn {...props} />
        ))}/>
        <Route path = '/signUp' render={(props) => (
        isLoggedIn ? (
        <Redirect to='/profile' />
          ) : (
        <SignUp {...props} />
        ))}/>
        <Route exact path = '/profile' render={(props) => (
        !isLoggedIn ? (
        <Redirect to='/' />
          ) : (
        <Profile {...props} />
        ))}/>
      </UserProvider>

      <BookProvider value={{ addBookToBookList, bookList }}>
        <Route path = '/explore' render={(props)=>(
        isLoggedIn ? (
          <Explore {...props}/>
        ) : ( 
          <Redirect to='/' />
        ))}/>
      </BookProvider>
      </div>
    </div>
  );
}

export default App;