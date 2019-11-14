  
import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Nav,Navbar,Form,FormControl,Figure,Button,Media,Container,Col,Row, Image} from 'react-bootstrap';
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import firebase from "../firebase"


class MakeAccountsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {    //State to hold all of our inputs as variables
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: ''
    };
    this.handleChange = this.handleChange.bind(this);   //Bind events to this state
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange (event) {    //Event change handler will set our state variables
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {     //Event submit handler will display alert screen displaying our state variables
      if(this.state.repassword === this.state.password && this.state.email !== "" && this.state.firstName !== "" && this.state.lastName !== "") {
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
              .then((firebaseUser) => {
                  // Success
                  // Check if user exists
                  if (firebaseUser) {
                      // Update Firebase User Profile
                      firebaseUser.user.updateProfile({
                          displayName: this.state.firstName + " " + this.state.lastName,
                      }).then(function () {
                          console.log("Update Profile successful")
                      }).catch(function (error) {
                          console.log(error);
                      });
                      // Add user to database + there other stuff
                      firebase.database().ref('users/' + firebaseUser.user.uid).set({
                          displayname: this.state.firstName + " " + this.state.lastName,
                          bio: "Hi, what's your name?",
                          email: this.state.email
                      });
                  }
              })
              .catch(function (error) {
                  // Error Catching for User Creation
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  if (errorCode === 'auth/weak-password') {
                      alert('Weak Password.');
                  } else if (errorCode === 'auth/invalid email') {
                      alert('Invalid Email');
                  } else if (errorCode === 'auth/email-already-in-use') {
                      alert('This email is already in use. Please try a different email.');
                  } else {
                      console.log(error);
                      console.log(errorMessage);
                  }
              });
          event.preventDefault();
      }else{
          alert('Passwords do not match or a field is empty.');
          event.preventDefault();
      }
      this.props.history.push('/profile');
  }
  
  render() {
    return (
      <form class="text-center border border-light p-5" action="#!" onSubmit={this.handleSubmit}>
        <p class="h4 mb-4">Sign up</p>

        <div class="form-row mb-4">
          {/* Enter First Name */}
          <div class="col">
            <input type="text" id="firstName" class="form-control" placeholder="First name" onChange={this.handleChange}/>
          </div>

          {/* Enter Last Name */}
          <div class="col">
            <input type="text" id="lastName" class="form-control" placeholder="Last name" onChange={this.handleChange}/>
          </div>
        </div>

        {/* Enter Email */}
        <input type="email" id="email" class="form-control mb-4" placeholder="E-mail" onChange={this.handleChange}/>

        <div class="form-row mb-4">
          {/* Enter Password */}
          <div class="col">
            <input type="password" id="password" class="form-control" placeholder="Password" onChange={this.handleChange}/>
          </div>

          {/* Confirm Password */}
          <div class="col">
            <input type="password" id="repassword" class="form-control" placeholder="Confirm" onChange={this.handleChange}/>
          </div>
        </div>

        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="defaultRegisterFormNewsletter"/>
          <label class="custom-control-label" for="defaultRegisterFormNewsletter">Subscribe to our newsletter</label>
        </div>

        <button class="btn btn-info my-4 btn-block" type="submit">Sign in</button>

        <p>By clicking <em>Sign up</em> you agree to our terms of service</p>
      </form>

      /**
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>TightReads</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} /> 
                <input type="text" name="lastName" placeholder="Last Name" onChange={this.handleChange}/>
                <input type="text" name="email" placeholder="E-mail" onChange={this.handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                <input type="password" name="repassword" placeholder="Re-enter Password" onChange={this.handleChange}/>
                <button>Make Account</button>
              </form>
          </section>
          <section className='display-item'>
            <div class Name='wrapper'>
              <ul>
                <li>First name: {this.state.firstName}</li>
                <li>Last name: {this.state.lastName}</li>
                <li>E-mail: {this.state.email}</li>
                <li>Password: {this.state.password}</li>
                <li>Re-entered Password: {this.state.repassword}</li>
              </ul>
            </div>
            <div>
              <Link to="/">Home</Link>
            </div>
          </section>
        </div>
      </div>
      **/
    );
  }
}

export default MakeAccountsPage;