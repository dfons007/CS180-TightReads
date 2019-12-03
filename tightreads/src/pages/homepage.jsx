import React, { Component } from "react";
import {Navbar, Nav,Row, Col, Form, FormControl, Button, Carousel, Container, CardDeck, Card} from 'react-bootstrap';
import firebase from "../firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGoogleSearch } from '../google.js';
import { LinkContainer } from 'react-router-bootstrap'

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      uid:'',
      recommended:'Horror',
      authflag: true,
        booksdone:false,
      query:'',
    };
    this.data = [];
    this.bookitems =[];

    this.handleChange = this.handleChange.bind(this);
    this.Search = this.Search.bind(this);
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

    handleChange(event) {    //Event change handler will set our state variables
        this.setState({[event.target.name]: event.target.value});
    }

    Search(event){
        event.preventDefault();
        console.log(this.state.query);
        this.props.history.push({pathname:'/books',state:{query:this.state.query}});
    }

  async componentDidMount(){
    var that = this;
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        if(this.state.authflag){
          firebase.database().ref('users/'+user.uid).once('value')
              .then(function(snapshot){
                  var rand = Math.floor( Math.random() * (snapshot.val().Genres.length - 0));
                  that.setState({recommended: snapshot.val().Genres[rand].value});
                  console.log(snapshot.val().Genres[rand].value);
                  console.log(that.state.recommended+"hello");
                  getGoogleSearch(that.state.recommended).then(data=>{
                      that.data = data;
                      console.log(that.state.recommended);
                      for(let i = 0; i < 6; i++){
                          var image = ((that.data.items[i].volumeInfo.imageLinks) ? that.data.items[i].volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/500");
                          var imageStyle = {};
                          var author = (that.data.items[i].volumeInfo.authors) ? that.data.items[i].volumeInfo.authors[0] : '';

                          if(that.data.items[i].volumeInfo.authors && snapshot.val().Authors && snapshot.val().Authors[author.replace(/[.#$/[\]]/gi,'')])
                          {
                            if(snapshot.val().Authors[author.replace(/[.#$/[\]]/gi,'')] === "black")
                            {
                                imageStyle = {filter: "grayscale(100%) blur(5px)"}
                            }

                            else if(snapshot.val().Authors[author.replace(/[.#$/[\]]/gi,'')] === "white")
                            {
                                imageStyle = {
                                    filter: "contrast(120%)",
                                    //x, y, (edge)blur, spread(size), color,
                                    "boxShadow": "0px 0px 3px 4px rgba(255,255,0,0.4), 0px 0px 3px 8px rgba(0,255,255,0.4), 0px 0px 3px 12px rgba(255,0,255,0.4)"
                                    }
                            }
                          }

                          that.bookitems.push(
                              <Card>
                                  <Card.Img variant="top" src={image} style={imageStyle} />
                                  <Card.Body>
                                      <Card.Title>{that.data.items[i].volumeInfo.title}</Card.Title>
                                      <Card.Text>
                                          {author}

                                          {/* <Button variant="outline-secondary" size="sm">Secondary</Button> */}

                                      </Card.Text>
                                  </Card.Body>
                                  <Card.Footer>
                                      {/* <small className="text-muted">Genre</small> */}
                                      <Button variant="secondary" size="sm" onClick={()=>
                                          that.props.history.push({pathname:'/bookprofile', state:{id:that.data.items[i].id}})
                                      }>
                                          More Info
                                      </Button>

                                  </Card.Footer>
                              </Card>
                          );
                      }
                      that.setState({booksdone:true});
                  });
                  that.setState({authflag:false});
              });
          this.setState({uid:user.uid});
          console.log('user', this.state.uid);
          this.setState({authflag:false});
        }
      }else{
        console.log('no user'); // Redirect to login
          this.props.history.push('/');
      }
    });
  }
render() {
    if(!this.state.booksdone){
        console.log("Not done");
        return null;
    }
    else return (
    <>
{/* search bar */}
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

            <Button type="submit" onClick={this.signout} variant="outline-light">Sign Out</Button>
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