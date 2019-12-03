import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav,Navbar,Form,FormControl,Button} from 'react-bootstrap';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import firebase from "../firebase";
import {LinkContainer} from "react-router-bootstrap";
import ContentEditable  from "react-contenteditable";
import FileUploader from "react-firebase-file-uploader";
import Select from "react-select";
import { getGoogleBook} from '../google.js';

const GENRES = ['Fiction', 'Non-Fiction', 'Poetry', 'Horror', 'Science-Fiction', 'Adventure', 'Romance', 'Drama'];



let options = [];

options = options.concat(GENRES.map(x => x));

function MakeOption(x) {
    return {value: x, label: x};
}

class ProfilePage extends Component {
  constructor(){
    super();
    this.state = {    //State to hold all of our inputs as variables
      display: '',
      email: '',
      bio: '',
      uid: '',
      editmode: true,
      authflag: true,
      query:'',
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "",
      selectstatus: "none",
      genrestring: "",
      title:'',
      author:'',
      artwork: '',
      bookgenre:'',
      link:'',
      isPresent: true,
    };
    this.genres = '';
    this.tempgenre = [];
    this.keys = '';


    this.onClick = this.onClick.bind(this);
    this.handleChangeDisplay = this.handleChangeDisplay.bind(this);
    this.handleChangeBio = this.handleChangeBio.bind(this);
    this.Search = this.Search.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.signout = this.signout.bind(this);
    this.handleDeleteFavorte = this.handleDeleteFavorte.bind(this);
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
  handleUploadStart = () => this.setState({isUploading:true, progress: 0});
  handleProgress = progress => this.setState({progress});
  handleUploadError = error => {
    this.setState({isUploading:false});
    console.error(error);
  };
  handleUploadSuccess = filename => {
    firebase
        .storage()
        .ref("images")
        .child(this.state.uid)
        .getDownloadURL()
        .then(url => this.setState({avatarURL: url}));
  };


  handleDeleteFavorte(){
    firebase.database().ref('users/'+ this.state.uid).child('Favorites').child(0).remove()
    // this.setState({isPresent: false});
  }

  handleChangeDisplay(event){
    var html = event.currentTarget.textContent;
    this.setState({ display: html });
  }
  handleChangeBio(event){
    var html = event.currentTarget.textContent;
    this.setState({ bio: html });
  }

  onClick(event){
    if(this.state.editmode === true){
      this.setState({editmode:false, selectstatus: ""});
      console.log("Editting");
      // do editting
    }else {
      this.setState({editmode: true, selectstatus: "none"});
      console.log(this.state.display);
      console.log(this.state.bio);
      firebase.database().ref('users/' + this.state.uid).update({
        displayname: this.state.display,
        bio: this.state.bio,
      });
      if (this.tempgenre.length !== 0) {
        firebase.database().ref('users/' + this.state.uid).child('Genres').set(
            this.tempgenre
        );
        this.genres = this.tempgenre[0].value;
        for (let i = 1; i < this.tempgenre.length; i++) {
          this.genres += ", " + this.tempgenre[i].value;
        }
        console.log(this.tempgenre);
        this.setState({genrestring: this.genres});
      }
      // save changes and submit to the database
    }
  }
  Search(event){
    event.preventDefault();
    console.log(this.state.query);
    this.props.history.push({pathname:'/books',state:{query:this.state.query}});
  }

componentDidMount() {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      var that = this;
      firebase.storage().ref("images").child(user.uid + ".jpg").getDownloadURL()
          .then(function(url){
              that.setState({avatarURL: url});
          }).catch(function(error){
              that.setState({avatarURL: "https://s.abcnews.com/images/Lifestyle/puppy-ht-3-er-170907_4x3_992.jpg"});
              console.log(error);
          });
      console.log(user.uid);
      if(this.state.authflag){
        var genrestring = '';
        var keysArray = [];
        firebase.database().ref('users/'+user.uid).once('value')
            .then(function(snapshot){
              that.setState({
                display: snapshot.val().displayname,
                email: snapshot.val().email,
                bio: snapshot.val().bio,
              });
              // Grabbing Genre's
                genrestring = snapshot.val().Genres[0].value;
              for(let i = 1; i < snapshot.val().Genres.length; i++){
                genrestring += ", "+snapshot.val().Genres[i].value;
              }
              that.setState({genrestring: genrestring});
              console.log(that.state.genrestring);
              that.setState({genres: genrestring});
              console.log(that.state.genres);
              // Make array full of book keys from books in the database


              if (snapshot.child('Favorites').exists()){
                keysArray[0] = snapshot.val().Favorites[0]
              }
              that.setState({keys: keysArray});
              // for(let i = 0; i < snapshot.val().Favorites.length; i++){
              //   keysArray[i] = snapshot.val().Favorites[i]
              // }
              that.setState({keys: keysArray})
              console.log("hello",that.state.keys)
            //   Get book info based on key given from key array
              if(snapshot.child('Favorites').exists()){
                getGoogleBook(that.state.keys[0]).then(data => {
                  that.setState({
                      title: (data.volumeInfo.title) ? data.volumeInfo.title : '',
                      author: (data.volumeInfo.authors) ? data.volumeInfo.authors[0] : '',
                      artwork: (data.volumeInfo.imageLinks) ? data.volumeInfo.imageLinks.thumbnail : '',
                      bookgenre: (data.volumeInfo.categories) ? data.volumeInfo.categories[0]  : '',
                      link: (data.volumeInfo.previewLink) ? data.volumeInfo.previewLink : '',
                  });


                  console.log(that.state.author);

                  that.setState({author: "By " + that.state.author});
                  that.setState({bookgenre: "Genre: " + that.state.bookgenre});

              });
              }
            });
        this.setState({uid: user.uid});
        console.log('user', this.state.uid);
        this.setState({authflag:false});
      }
    }else{
      console.log('no user');
      this.props.history.push('/');
    }
  });
}

  render() {
    let button;

    const isPresent = this.state.isPresent;
    //Delete favorite book
    if (isPresent){
      button =
      <Button variant='info' size='sm' onClick={this.handleDeleteFavorte}>
        Remove from favorites
      </Button>;
    }
    // authentication, if not authenticated return to home

    // Can we make this cleaner?
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
          <Button variant="outline-light" onClick={this.onClick}>Edit</Button>
          <Button type="submit" onClick={this.signout} variant="outline-light">Sign Out</Button>
          <label style={{backgroundColor: "#343A40" , color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
            Upload Profile Image
            <FileUploader
                hidden
              accept="image/*"
              name="avatar"
              filename={file=> this.state.uid + ".jpg"}
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handlePRogress}
            />
          </label>

        </Navbar>

        <br/>
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
                        src = {this.state.avatarURL}
                        alt="Profile Picture"
                        style={{display:false,height:500, width:800}}
                    />
                    <a href="#!">
                      <MDBMask overlay="white-slight" className="waves-light" />
                    </a>
                  </MDBView>
                  <h3 className="font-weight-bold dark-grey-text mb-3 p-0">
                    <ContentEditable id="display" href="#!" disabled={this.state.editmode} html={this.state.display} onChange={this.handleChangeDisplay}>
                    </ContentEditable>
                  </h3>
                  <ContentEditable id="bio" disabled={this.state.editmode} className="dark-grey-text mb-lg-0 mb-md-5 mb-4" html={this.state.bio} onChange={this.handleChangeBio}>
                  </ContentEditable>
                  <h3 className="font-weight-bold dark-grey-text mb-3 p-0">
                    <a href="#!">Interested In</a>
                  </h3>
                    <p>{this.state.genrestring}</p>
                    <div style={{display: this.state.selectstatus}}>
                        <p>Select new genres:</p>
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
                    </div>
                </div>
              </MDBCol>

              <MDBCol md="12" lg="6">
                <h3 className="font-weight-bold dark-grey-text mb-3 p-0">
                  <a href="#!">Favorite Books </a>
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
                            src = {this.state.artwork}
                            alt=""
                        />
                        <a href="#!">
                          <MDBMask overlay="white-slight" className="waves-light" />
                        </a>
                      </MDBView>
                    </MDBCol>
                    <MDBCol md="9">
                      <p className="font-weight-bold dark-grey-text">
                        {this.state.title}
                      </p>
                      <div className="d-flex justify-content-between">
                        <MDBCol size="11" className="text-truncate pl-0 mb-3">
                          <a href="#!" className="dark-grey-text">
                            {this.state.author}
                          </a>
                        </MDBCol>
                        <a href={this.state.link}>
                          <MDBIcon icon="angle-double-right" />
                        </a>
                      </div>
                      <a>
                        {this.state.bookgenre}
                      </a>
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