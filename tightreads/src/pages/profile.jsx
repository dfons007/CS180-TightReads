import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,Navbar,Form,FormControl,Figure,Button,Media,Container,Col,Row, Image} from 'react-bootstrap';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBAvatar } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import firebase from "../firebase";
import ContentEditable from "react-contenteditable";

class ProfilePage extends Component {
  constructor () {
    super();
    this.state = {    //State to hold all of our inputs as variables
      display: '',
      email: '',
      bio: '',
      genres: 'Romance, Self-Help',
      uid: '',
      editmode: false,
      authflag: true,
      query:'',
    };

    this.onClick = this.onClick.bind(this);
    this.handleChangeDisplay = this.handleChangeDisplay.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.Search = this.Search.bind(this);
  }
  handleChangeDisplay(event){
    this.setState({ display: event.currentTarget.textContent });
    console.log(this.state.display);
    console.log(this.state.bio);
  }
  handleChange(event) {    //Event change handler will set our state variables
    this.setState({[event.target.name]: event.target.value});
  }
  handleChangeBio(event){
    this.setState({ bio: event.currentTarget.textContent });
    console.log(this.state.display);
    console.log(this.state.bio);
  }

  onClick(event){
    if(this.state.editmode === false){
      this.setState({editmode:true});
      console.log("Working button");
      // do editting
    }else{
      this.setState({editmode:false});
      console.log(this.state.display);
      console.log(this.state.bio);
      firebase.database().ref('users/'+this.state.uid).update({
        displayname:this.state.display,
        bio:this.state.bio,
      });
      // save changes and submit to the database
    }
  }
  Search(event){
    event.preventDefault();
    console.log(this.state.query);
    this.props.history.push({pathname:'/books',state:{query:this.state.query}});
  }


  render() {
    // authentication, if not authenticated return to home

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log(user.uid);
        if(this.state.authflag){
          var that = this;
          firebase.database().ref('users/'+user.uid).once('value')
              .then(function(snapshot){
                that.setState({
                  display: snapshot.val().displayname,
                  email: snapshot.val().email,
                  bio: snapshot.val().bio,
                });
              });
          this.setState({uid: user.uid});
          console.log('user', this.state.uid);
          this.setState({authflag:false});
        }
      }else{
        console.log('no user');
      }
    });

    // Can we make this cleaner?
    return (
      <>
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">TightReads</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Profile</Nav.Link>
      <Nav.Link href="#pricing">Logout</Nav.Link>
    </Nav>
    <Form onSubmit={this.Search} inline>
      <FormControl name="query" type="text" placeholder="Search Books" className="mr-sm-2" onChange={this.handleChange}/>
      <Button type="submit" variant="outline-light">Search</Button>
    </Form>
  </Navbar>

  <br/>





<MDBCard
        className="my-5 px-5 mx-auto"
        style={{ fontWeight: 300, maxWidth: "90%" }}
      >
        <MDBCardBody style={{ paddingTop: 0 }}>
          <MDBRow>
            <MDBCol md="12" lg="6">
              <div className="mb-4">
                <MDBView hover rounded className="z-depth-1-half mb-4">
                  <img
                    className="img-fluid"
                    // src="https://mdbootstrap.com/img/Photos/Slides/1.jpg"
                    src = "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg"
                    alt="Profile Picture"
                  />
                  <a href="#!">
                    <MDBMask overlay="white-slight" className="waves-light" />
                  </a>
                </MDBView>
                <h3 className="font-weight-bold dark-grey-text mb-3 p-0">
                  <a id="display" contentEditable={this.state.editmode} href="#!" onInput={this.handleChangeDisplay}>
                    {this.state.display}
                  </a>
                </h3>
                <p id="bio" type="input" contentEditable={this.state.editmode} className="dark-grey-text mb-lg-0 mb-md-5 mb-4" onInput={this.handleChangeBio}>
                  {this.state.bio}
                </p>
                <h3 className="font-weight-bold dark-grey-text mb-3 p-0">
                  <a href="#!">Interested In</a>
                </h3>
                <p>
                  {this.state.genres}
                </p>
              </div>
            </MDBCol>

            <MDBCol md="12" lg="6">

            <h3 className="font-weight-bold dark-grey-text mb-3 p-0">
                  <a href="#!">Recent Reads</a>
                </h3>
              <div style={{
                borderBottom: "1px solid #e0e0e0",
                marginBottom: "1.5rem"
              }}>
                <MDBRow>
                  <MDBCol md="3">
                    <MDBView hover rounded className="z-depth-1-half mb-4">
                      <img
                        className="img-fluid"
                        // src="https://mdbootstrap.com/img/Photos/Others/img%20(29).jpg"
                        src = "https://images-na.ssl-images-amazon.com/images/I/41K99%2BcInvL._SX326_BO1,204,203,200_.jpg"
                        alt=""
                      />
                      <a href="#!">
                        <MDBMask overlay="white-slight" className="waves-light" />
                      </a>
                    </MDBView>
                  </MDBCol>
                  <MDBCol md="9">
                    <p className="font-weight-bold dark-grey-text">
                      26/02/2018
                    </p>
                    <div className="d-flex justify-content-between">
                      <MDBCol size="11" className="text-truncate pl-0 mb-3">
                        <a href="#!" className="dark-grey-text">
                          Twilight
                        </a>
                      </MDBCol>
                      <a href="#!">
                        <MDBIcon icon="angle-double-right" />
                      </a>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>

              <div style={{
                borderBottom: "1px solid #e0e0e0",
                marginBottom: "1.5rem"
              }}>
                <MDBRow>
                  <MDBCol md="3">
                    <MDBView hover rounded className="z-depth-1-half mb-4">
                      <img
                        className="img-fluid"
                        // src="https://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(45).jpg"
                        src = "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/11/18/1416314274597/f3cee720-072a-4f02-9e1c-61048e26daad-500x720.jpeg?width=300&quality=85&auto=format&fit=max&s=708349c04cc087a4ea2600064d901da3"
                        alt=""
                      />
                      <a href="#!">
                        <MDBMask overlay="white-slight" className="waves-light" />
                      </a>
                    </MDBView>
                  </MDBCol>
                  <MDBCol md="9">
                    <p className="font-weight-bold dark-grey-text">
                      25/02/2018
                    </p>
                    <div className="d-flex justify-content-between">
                      <MDBCol size="11" className="text-truncate pl-0 mb-3">
                        <a href="#!" className="dark-grey-text">
                          50 Shades of Gray 
                        </a>
                      </MDBCol>
                      <a href="#!">
                        <MDBIcon icon="angle-double-right" />
                      </a>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>

              <div style={{
                    borderBottom: "1px solid #e0e0e0",
                    marginBottom: "1.5rem"
                  }}>
                <MDBRow>
                  <MDBCol md="3">
                    <MDBView hover rounded className="z-depth-1-half mb-4">
                      <img
                        className="img-fluid"
                        // src="https://mdbootstrap.com/img/Photos/Others/images/87.jpg"
                        src = "https://images-na.ssl-images-amazon.com/images/I/41qdft82M9L.jpg"
                        alt=""
                      />
                      <a href="#!">
                        <MDBMask overlay="white-slight" className="waves-light" />
                      </a>
                    </MDBView>
                  </MDBCol>
                  <MDBCol md="9">
                    <p className="font-weight-bold dark-grey-text">
                      24/03/2018
                    </p>
                    <div className="d-flex justify-content-between">
                      <MDBCol size="11" className="text-truncate pl-0 mb-3">
                        <a href="#!" className="dark-grey-text">
                          sadboiis
                        </a>
                      </MDBCol>
                      <a href="#!">
                        <MDBIcon icon="angle-double-right" />
                      </a>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>

            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

</>
    );
  }
}


export default ProfilePage;