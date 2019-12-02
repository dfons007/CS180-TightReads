import React, { Component } from 'react';
import Select from "react-select";
import firebase from "../firebase"
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const GENRES = ['Fiction', 'Non-Fiction', 'Poetry', 'Horror', 'Science-Fiction', 'Adventure', 'Romance', 'Drama'];

let options = [];

options = options.concat(GENRES.map(x => x));

function MakeOption(x) {
  return {value: x, label: x};
}

class MakeAccountsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {    //State to hold all of our inputs as variables
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repassword: '',
            biography: '',
            favGenres: ['Horror', 'Fiction'],
            query:'',
        };
        this.handleChange = this.handleChange.bind(this);   //Bind events to this state
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Search = this.Search.bind(this);
        this.tempgenre = [];

        this.signout = this.signout.bind(this);
    }

    signout(event){
        console.log("signout button pressed");
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
        });
    }

    handleInputChange = (value, e) => {
        console.log(e);
        this.tempgenre = value;
        this.setState({favGenres: this.tempgenre});
        console.log(this.state.favGenres);
        console.log(this.tempgenre);
    };

    Search(event){
        event.preventDefault();
        console.log(this.state.query);
        this.props.history.push({pathname:'/books',state:{query:this.state.query}});
    }

    handleChange(event) {    //Event change handler will set our state variables
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {     //Event submit handler will display alert screen displaying our state variables
        console.log(this.state.email);
        console.log(this.state.firstName);
        console.log(this.state.favGenres);
        if (this.state.repassword === this.state.password && this.state.email !== "" && this.state.firstName !== "" && this.state.lastName !== "") {
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
                            bio: this.state.biography,
                            email: this.state.email,
                        });
                        firebase.database().ref('users/'+ firebaseUser.user.uid).child('Genres').update(
                            this.tempgenre,
                            err => console.log(err ? 'error while pushing':'success')
                        )
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
        } else {
            alert('Passwords do not match or a field is empty.');
            event.preventDefault();
        }
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <LinkContainer to="/homepage">
                        <Navbar.Brand href="#home">TightReads</Navbar.Brand>
                    </LinkContainer>
                    <Nav className="mr-auto">
                        <LinkContainer to="/homepage">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/profile">
                            <Nav.Link>Profile</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/makeaccounts">
                            <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Form onSubmit={this.Search} inline>
                        <FormControl name="query" type="text" placeholder="Search Books" className="mr-sm-2" onChange={this.handleChange}/>
                        <Button type="submit" variant="outline-light">Search</Button>
                    </Form>

                    <Button type="submit" onClick={this.signout} variant="variant-light">Sign Out</Button>
                </Navbar>

                <br/>

                <form class="text-center border border-light p-5" action="#!" onSubmit={this.handleSubmit}>
                    <h1 class="display-3 mb-4">Welcome to Tight Reads</h1>
                    <p class="h3 mb-3">Sign up</p>

                    <div class="form-row mb-4">
                        {/* Enter First Name */}
                        <div class="col">
                            <input type="text" name="firstName" class="form-control" placeholder="First name"
                                   onChange={this.handleChange}/>
                        </div>

                        {/* Enter Last Name */}
                        <div class="col">
                            <input type="text" name="lastName" class="form-control" placeholder="Last name"
                                   onChange={this.handleChange}/>
                        </div>
                    </div>

                    {/* Enter Email */}
                    <input type="email" name="email" class="form-control mb-4" placeholder="E-mail"
                           onChange={this.handleChange}/>

                    <div class="form-row mb-4">
                        {/* Enter Password */}
                        <div class="col">
                            <input type="password" name="password" class="form-control" placeholder="Password"
                                   onChange={this.handleChange}/>
                        </div>

                        {/* Confirm Password */}
                        <div class="col">
                            <input type="password" name="repassword" class="form-control" placeholder="Confirm"
                                   onChange={this.handleChange}/>
                        </div>
                    </div>

                    {/* Enter biography */}
                    <input type="text" name="biography" class="form-control mb-4"
                           placeholder="Insert something about yourself!" onChange={this.handleChange}/>

                    {/* Favorite Genre Selection */}
                    <Select
                        isMulti
                        type='selection'
                        name="favGenres"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select Favorite Genre:"
                        options={options.map(x => MakeOption(x))}
                        closeMenuOnSelect={false}
                        onChange={this.handleInputChange}
                        inputValue={this.state.value}
                    />

                    <button class="btn btn-info my-4 btn-block" type="submit">Sign up</button>

                    <p>By clicking <em>Sign up</em> you agree to our terms of service</p>
                </form>


            </div>
        );
    }
}

export default MakeAccountsPage;