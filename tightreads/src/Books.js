import React, {Component} from 'react';
import request from 'superagent';
import BookList from './BookList';
import {LinkContainer} from "react-router-bootstrap";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import firebase from "./firebase"


//contains all the book search logic
class Books extends Component
{
    constructor(props){
        super(props);
        this.state = {
            authors: {},
            books: [],
            searchField: "",
            // lastQuery: ''
        };
        this.Search = this.Search.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                firebase.database().ref('users/'+user.uid).once('value').then(function(snapshot){
                    this.setState({authors: snapshot.val().Authors});
                    //this.state.authors = snapshot.val().Authors
                }.bind(this));
            }
        });
        
        var id;
        if(this.props.location.state.query === undefined)
            id = this.state.query;
        else
            id = this.props.location.state.query;
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
          </Navbar>

          <br/>
          {/* passes in handleSearch and searchBook method */}
          {/* passes data in state to BookList Component */}
          <BookList books={this.state.books} authors={this.state.authors} props={this}/>
      </div>
    );

  }

}

export default Books;