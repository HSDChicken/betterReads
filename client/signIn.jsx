import React, {useContext, useState} from 'react';
import UserContext from './userContext';
import regeneratorRuntime from "regenerator-runtime";

const SignIn = (props) => {
  const user = useContext(UserContext);

  const [password, setPassword] = useState('');
   
  const login = async (username, password) => {
    try{
      let data =  await fetch('/api/user/login', {
        method :'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userName: username,
          password
        })
      });
      console.log('did we get data back')
      data = await data.json();
      if (typeof data === 'string') {
        // return new Error({message: 'no user found'});
        console.log(data)
      }
      // add the data to the shelves;
      user.setLoggedIn(true);
    } catch (e) {
      console.log("error logging in")
    }
   
  };

  return(
    
  <div className="page-container" id="sign-in-container">

  <div className="input-container">

    <label htmlFor="username-field" className="text">Username</label>
    <input onChange={(e)=>user.addUsername(e.target.value)} type="text" placeholder="Username" className="input-field" id="username-field"/>
    <label htmlFor="password-field" className="text">Password</label>
    <input onChange={(e)=>setPassword(e.target.value)} type="text" placeholder="Password" className="input-field" id="password-field"/>
    <button onClick={()=> login(user.username, password)} className="button" id="submit-button">Submit</button>

  </div>

  {/* <div>

    <NavLink to="/signUp">Sign Up</NavLink>
    
  </div> */}

</div>
  )
}

export default SignIn;