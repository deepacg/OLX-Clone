import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';

const Create = () => {
  
  const history = useHistory()
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name, setname] = useState('')
  const [category, setcategory] = useState('')
  const [price, setprice] = useState('')
  const [image, setimage] = useState(null)
  const date = new Date()

  const handleSubmit = () => {

    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref}) => {
      ref.getDownloadURL().then((url) => {
        //console.log(url)
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toDateString()
        }).then(() => {
          alert('Item uploaded')
          history.push('/')
        })
      })
    })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label> Name </label>
            <br />
            <input
              className="input"
              type="text"
              value = {name}
              onChange = {(e) => {setname(e.target.value)}}
              id="fname"
              name="Name"
              // defaultValue="John"
            />
            <br />
            <label> Category </label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange = {(e) => {setcategory(e.target.value)}}
              id="category"
              name="category"
              // defaultValue="John"
            />
            <br />
            <label> Price </label>
            <br />
            <input 
              className="input" 
              type="number" 
              value = {price}
              onChange = {(e) => {setprice(e.target.value)}}
              id="price" 
              name="Price" 
            />
            <br />
          
          <br />
          <img 
            alt="Posts" 
            width="200px" 
            height="200px" 
            src = {image ? URL.createObjectURL(image) : ''}
            />
          
            <br />
            <input 
              type="file" 
              onChange = {(e) => {setimage(e.target.files[0])}}
            />
            <br />
            <button onClick = {handleSubmit} className="uploadBtn"> Upload and Submit </button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
