import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Navbar, Nav,Row, Col, Form, FormControl, Button, Carousel, Container, CardDeck, Card} from 'react-bootstrap';
import firebase from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGoogleBook, getGoogleSearch } from '../google.js';
import { LinkContainer } from 'react-router-bootstrap'

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      uid:'',
      recommended:'',
      authflag: true,
    };
    this.data = [];
    this.bookitems =[];
  }

  componentDidMount(){
    const subject = "horror";//this.props.match.params;

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        if(this.state.authflag){
          firebase.database().ref('users/'+user.uid).once('value')
              .then(function(snapshot){
                //that.setState({}); get recommended category
              });
          const subject = "horror";
          this.setState({uid:user.uid});
          console.log('user', this.state.uid);
          this.setState({authflag:false});
        }
      }else{
        console.log('no user'); // Redirect to login
      }
    });

    getGoogleSearch(subject).then(data=>{
      this.data = data;
      console.log(this.data);
      console.log(this.data.items[1].volumeInfo);
      console.log(this.data.items[1].volumeInfo.authors);
      console.log(this.data.items[1].volumeInfo.imageLinks.thumbnail);
      console.log(this.data);
      for(let i = 0; i < 6; i++){
        this.bookitems.push(
            <Card>
              <Card.Img variant="top" src={this.data.items[i].volumeInfo.imageLinks.thumbnail} />
              <Card.Body>
                <Card.Title>{this.data.items[i].volumeInfo.title}</Card.Title>
                <Card.Text>
                  {this.data.items[i].volumeInfo.authors}

                  {/* <Button variant="outline-secondary" size="sm">Secondary</Button> */}

                </Card.Text>
              </Card.Body>
              <Card.Footer>
                {/* <small className="text-muted">Genre</small> */}
                <Button variant="secondary" size="sm" onClick={()=>
                  this.props.history.push({pathname:'/bookprofile', state:{id:this.data.items[i].id}})
                }>
                  More Info
                  </Button>

              </Card.Footer>
            </Card>
        );
      }
    });
    console.log(this.data);

  }
render() {
  return (
    <>

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


      <h1>Welcome to TightReads</h1>
      <br/>


      <Container>
        <Row className="justify-content-md-center">

          <Col md="10">
            
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://miro.medium.com/max/780/1*C76PXdoMXtysxqiwkS5iow.png"
                  alt="First slide"
                  height={500}
                />
                <Carousel.Caption>
                  <h3>Favorite Books</h3>
                  <p>Keep a list of your favorite books.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://www.incimages.com/uploaded_files/image/970x450/getty_501912142_200013332000928048_325616.jpg"
                  alt="Third slide"
                  height={500}
                />

                <Carousel.Caption>
                  <h3>Share Books</h3>
                  <p>Let people know what you are reading.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://parade.com/wp-content/uploads/2015/02/audio-vs.-printed-books.jpg"
                  alt="Third slide"
                  height={500}
                />

                <Carousel.Caption>
                  <h3>Explore Books</h3>
                  <p>Find recommendations and what your friends are reading.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

          </Col>

        </Row>
      </Container>





      <br/>
      <br/>
      <br/>
      <br/>


      <h2>Recommended for you</h2>

      <CardDeck>
        {this.bookitems}
      </CardDeck>


    </>

    );
  }
}

export default HomePage;