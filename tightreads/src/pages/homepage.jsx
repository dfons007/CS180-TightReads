import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import {Navbar, Nav,Row, Col, Form, FormControl, Button, Carousel, Container, CardDeck, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class HomePage extends Component {
render() {
  return (
    <>

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">TightReads</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#Login">Login</Nav.Link>
          <Nav.Link href="#Profile">Sign Up</Nav.Link>
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


      <h2>Popular</h2>

      <CardDeck>
      <Card>
        <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41K99%2BcInvL._SX326_BO1,204,203,200_.jpg" />
        <Card.Body>
          <Card.Title>Book Title</Card.Title>
          <Card.Text>
          Author

          {/* <Button variant="outline-secondary" size="sm">Secondary</Button> */}

          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {/* <small className="text-muted">Genre</small> */}
          <Button variant="secondary" size="sm">More Info</Button>

        </Card.Footer>
      </Card>

      <Card>
        <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41K99%2BcInvL._SX326_BO1,204,203,200_.jpg" />
        <Card.Body>
          <Card.Title>Book Title</Card.Title>
          <Card.Text>
            Author
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <Button variant="secondary" size="sm">More Info</Button>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41K99%2BcInvL._SX326_BO1,204,203,200_.jpg" />
        <Card.Body>
          <Card.Title>Book Title</Card.Title>
          <Card.Text>
          Author
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <Button variant="secondary" size="sm">More Info</Button>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41K99%2BcInvL._SX326_BO1,204,203,200_.jpg" />
        <Card.Body>
        <Card.Title>Book Title</Card.Title>
          <Card.Text>
          Author
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <Button variant="secondary" size="sm">More Info</Button>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41K99%2BcInvL._SX326_BO1,204,203,200_.jpg" />
        <Card.Body>
          <Card.Title>Book Title</Card.Title>
          <Card.Text>
          Author
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <Button variant="secondary" size="sm">More Info</Button>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Img variant="top" src="https://images-na.ssl-images-amazon.com/images/I/41K99%2BcInvL._SX326_BO1,204,203,200_.jpg" />
        <Card.Body>
          <Card.Title>Book Title</Card.Title>
          <Card.Text>
          Author
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <Button variant="secondary" size="sm">More Info</Button>
        </Card.Footer>
      </Card>
    </CardDeck>


    </>

    );
  }
}

export default HomePage;