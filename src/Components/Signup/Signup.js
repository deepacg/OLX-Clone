import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  
  const history = useHistory()
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const handleSignup = (e) => {

    e.preventDefault()            // to prevent page reload
    //console.log(firebase)
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      result.user.updateProfile({displayName : username}).then(() => {
        firebase.firestore().collection('users').add({
          id : result.user.uid,
          username : username,
          phone : phone
        }).then(() => {
          history.push('/login')
        }).catch(err => {
          console.log(err.code)
        })
      })
    })
  }

  return (
    <div>
      <div className = "signupParentDiv">
        <img width = "200px" height = "200px" src = {Logo}></img>
        <form onSubmit = {handleSignup}>
          <label> Username </label>
          <br />
          <input
            className = "input"
            type = "text"
            value = {username}
            onChange = {(e) => {setusername(e.target.value)}}
            id = "fname"
            name = "name"
            // defaultValue="John"
          />
          <br />
          <label> Email </label>
          <br />
          <input
            className = "input"
            type = "email"
            value = {email}
            onChange = {(e) => {setemail(e.target.value)}}
            id = "email"
            name = "email"
            // defaultValue="John"
          />
          <br />
          <label> Phone </label>
          <br />
          <input
            className = "input"
            type = "number"
            value = {phone}
            onChange = {(e) => {setphone(e.target.value)}}
            id = "phone"
            name = "phone"
            // defaultValue="Doe"
          />
          <br />
          <label> Password </label>
          <br />
          <input
            className = "input"
            type = "password"
            value = {password}
            onChange = {(e) => {setpassword(e.target.value)}}
            id = "password"
            name = "password"
            // defaultValue="Doe"
          />
          <br />
          <br />
          <button> Signup </button>
        </form>
        <a> Login </a>
      </div>
    </div>
  );
}
