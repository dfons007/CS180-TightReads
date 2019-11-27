import React, {Component} from 'react';
import request from 'superagent';
import BookList from './BookList';
import {LinkContainer} from "react-router-bootstrap";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import firebase from "firebase";


//contains all the book search logic
class Books extends Component
{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            searchField: "",
            // lastQuery: ''
        };
        this.Search = this.Search.bind(this);
        this.handleChange = this.handleChange.bind(this);

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

    Search(event){
        event.preventDefault();
        console.log(this.state.query);
        this.props.history.push({pathname:'/books',state:{query:this.state.query}});
    }
    handleChange(event) {    //Event change handler will set our state variables
        this.setState({[event.target.name]: event.target.value});
    }
    componentDidMount(){
        if(this.props.location.state.query === undefined)
            var id = this.state.query;
        else
            var id = this.props.location.state.query;
        console.log(id);
        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query({ q: id})
            .then((data) =>
            {
                console.log(data);
                this.setState({books: [...data.body.items]})

            })
            .catch((err) => {console.log(err)});
        console.log(this.state.searchField);

    }

    handleSearch = (e) =>
    {
        console.log(e.target.value);
        this.setState({searchField: e.target.value});
    }

    // handles requests from google books API


  render()
  {
    return(
      <div >
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
              <Button type="submit" onClick={this.signout} variant="light">Sign Out</Button>
          </Navbar>

          <br/>
          {/* passes in handleSearch and searchBook method */}
          {/* passes data in state to BookList Component */}
          <BookList books={this.state.books} props={this}/>
      </div>
    );

  }

}

export default Books;