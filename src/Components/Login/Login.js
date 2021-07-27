import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context'; 
import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

  const history = useHistory()
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const handleLogin = (e) => {
    
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      // alert('Logged in')
        history.push('/')
      }).catch(err => {
        alert(err.message)
        console.log(err.code)
      })
  }

  return (
    <div>
      <div className = "loginParentDiv">
        <img width = "200px" height = "200px" src = {Logo}></img>
        <form onSubmit = {handleLogin}>
          <label> Email </label>
          <br />
          <input
            className = "input"
            type = "email"
            value = {email}
            onChange = {(e) => setemail(e.target.value)}
            id = "fname"
            name = "email"
            // defaultValue="John"
          />
          <br />
          <label> Password </label>
          <br />
          <input
            className = "input"
            type = "password"
            value = {password}
            onChange = {(e) => setpassword(e.target.value)}
            id = "password"
            name = "password"
            // defaultValue="Doe"
          />
          <br />
          <br />
          <button> Login </button>
        </form>
        <a> Signup </a>
      </div>
    </div>
  );
}

export default Login;
