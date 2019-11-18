
import React, { Component } from 'react';
import Select from "react-select";
import firebase from "../firebase"


const GENRES = ['Fiction', 'Non-Fiction', 'Poetry', 'Horror', 'Science-Fiction', 'Adventure', 'Romance', 'Drama']

let options = [];

options = options.concat(GENRES.map(x => x));

function MakeOption(x) {
  return {value: x, label: x};
}

class MakeAccountsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {    //State to hold all of our inputs as variables
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: '',
      biography: '',
      favGenres: []
    };
    this.handleChange = this.handleChange.bind(this);   //Bind events to this state
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange = (value, e) => {
      if (e.action === "input-change") {
        this.setState({ [e.target.name]: value });
      }
  };

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
                  <LinkContainer to="/makeaccounts">
                      <Nav.Link>Sign Up</Nav.Link>
                  </LinkContainer>
              </Nav>
              <Form inline>
                  <FormControl type="text" placeholder="Search Books" className="mr-sm-2" />
                  <Button variant="outline-light">Search</Button>
              </Form>
          </Navbar>

          <br/>
          <br/>
      <form class="text-center border border-light p-5" action="#!" onSubmit={this.handleSubmit}>
        <h1 class="display-3 mb-4">Welcome to Tight Reads</h1>
        <p class="h3 mb-3">Sign up</p>

        <div class="form-row mb-4">
          {/* Enter First Name */}
          <div class="col">
            <input type="text" id="firstName" class="form-control" placeholder="First name" onChange={this.handleChange}/>
          </div>

          {/* Enter Last Name */}
          <div class="col">
            <input type="text" name="lastName" class="form-control" placeholder="Last name" onChange={this.handleChange}/>
          </div>
        </div>

        {/* Enter Email */}
        <input type="email" name="email" class="form-control mb-4" placeholder="E-mail" onChange={this.handleChange}/>

        <div class="form-row mb-4">
          {/* Enter Password */}
          <div class="col">
            <input type="password" name="password" class="form-control" placeholder="Password" onChange={this.handleChange}/>
          </div>

          {/* Confirm Password */}
          <div class="col">
            <input type="password" name="repassword" class="form-control" placeholder="Confirm" onChange={this.handleChange}/>
          </div>
        </div>

        {/* Enter biography */}
        <input type="text" name="biography" class="form-control mb-4" placeholder="Insert something about yourself!" onChange={this.handleChange}/>

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
          onInputChange={this.handleInputChange}
          inputValue={this.state.value}
        />

        <button class="btn btn-info my-4 btn-block" type="submit">Sign up</button>

        <p>By clicking <em>Sign up</em> you agree to our terms of service</p>
      </form>


      </div>
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
    );
  }
}

export default MakeAccountsPage;