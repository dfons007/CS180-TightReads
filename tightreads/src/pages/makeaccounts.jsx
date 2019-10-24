import React, { Component } from 'react';

class MakeAccountsPage extends Component {
  constructor () {
    super();
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
    alert("Please import this into database: " + this.state.firstName + " " + this.state.lastName)
    event.preventDefault()
  }
  
  render() {
    return (
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
                <input type="text" name="password" placeholder="Password" onChange={this.handleChange}/>
                <input type="text" name="repassword" placeholder="Re-enter Password" onChange={this.handleChange}/>
                <button>Make Account</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                <li>First name: {this.state.firstName}</li>
                <li>Last name: {this.state.lastName}</li>
                <li>E-mail: {this.state.email}</li>
                <li>Password: {this.state.password}</li>
                <li>Re-entered Password: {this.state.repassword}</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default MakeAccountsPage;