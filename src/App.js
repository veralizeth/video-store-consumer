
import React, { Component, useState } from 'react';
import './App.css';
import Routing from './components/Routing'
import axios from 'axios';
import FlashMessage from './components/FlashMessage';
import picture1 from './images/Picture1.png';
import SideBar from './components/SideBar';

const App = (props) => {


  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [flash, setFlash] = useState(null)
  const [error, setError] = useState(undefined)
  const [success, setSuccess] = useState(undefined)

  const onSubmitMovieCallback = (movie) => {
    setSelectedMovie(movie)
  }

  const onSubmitUserCallback = (user) => {
    setSelectedUser(user)
  }


  const checkOut = (selectedUser, selectedMovie) => {
    const url = "http://localhost:3000/";

    if (selectedUser == null || selectedMovie == null ) {
      setError("Please select User and Movie. ")
    } else {
      axios.post(`${url}rentals/${selectedMovie.title}/check-out`, {
        title: selectedMovie.title,
        customer_id: selectedUser.id,
      }).then((response) => {
        setFlash(true)
        setSuccess(`Successfully Checked out`)
        setSelectedUser(null)
        setSelectedMovie(null)
      }).catch((error) => {
        console.log(`Error: ${error}`)
        setError(error.message)
      })
    }
  }

  const onTimeout = () => {
    console.log("timing out, clearing state");
    // clear success and error messages
    // clear selected customer and movie
    setSuccess(undefined);
    setError(undefined);
    setFlash(null)
  }

  return (
    <section>
      <section className="sticky" id="myHeader">
      <header className="header">
        <h1 class="text_1">Piper's Pictures</h1>
      </header>

      <span className="top">
        <span className="container">
        </span>
        {/* <div className="item-a">
          <input className="checkout-button" type="button" value="Checkout" onClick={() => checkOut(selectedUser, selectedMovie)} />
        </div> */}
        <div className="selected_wording">
          <p><strong className="strong-titles">User : </strong>{selectedUser ? selectedUser.name : "Please select an User"}</p>
        </div>
        <div className="selected_wording">
          <p><strong className="strong-titles">Movie: </strong> {selectedMovie ? selectedMovie.title : "Please select a Movie"}</p>
        </div>
        <div className="selected_wording">
          <p><strong className="strong-titles">Status: </strong> {flash ? "Successfully Checked out" : "Not Checked Out"}</p>
        </div>
        <div className="logo">
          <img src={picture1} width="140" height="125" />
        </div>
      </span>
      {error
        ? <FlashMessage
          messageContents={error}
          messageClass="error-message"
          onTimeoutCallback={onTimeout} />
        : ""}
      {success
        ? <FlashMessage
          messageContents={success}
          messageClass="success-message"
          onTimeoutCallback={onTimeout} />
        : ""}
      <span className='navbar'>
        <Routing {...{ onSubmitUserCallback, onSubmitMovieCallback }}
        />
      </span>
      <SideBar width={300} height={"30vh"}>
        <p className="p-welcome">Welcome to Piper's Checkout :) </p>
        <div className="selected_checkout-bar">
          <p>User : {selectedUser ? selectedUser.name : "Please select an User"}</p>
        </div>
        <div className="selected_checkout-bar">
          <p>Movie : {selectedMovie ? selectedMovie.title : "Please select a Movie"}</p>
        </div>
        <div className="selected_checkout-bar">
          <input className="checkout-button" type="button" value="Checkout" onClick={() => checkOut(selectedUser, selectedMovie)} />
        </div>
      </SideBar>
      </section>
    </section>
  );
};

export default App;
