import React, {Component} from "react";
import firebase from "../firebase";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:'',
            query:'',
            authflag:true,
            uid:'',
        };
        this.handleSubmit = this.handleSubmit.bind(this); // bind event
        this.handleChange = this.handleChange.bind(this);
        this.Search = this.Search.bind(this);
    }
    handleChange (event) {    //Event change handler will set our state variables
        this.setState({ [event.target.name]: event.target.value });
    }
    Search(event){
        event.preventDefault();
        console.log(this.state.query);
        this.props.history.push({pathname:'/books',state:{query:this.state.query}});
    }

    handleSubmit(event){
        var email = this.state.email;
        var password = this.state.password;
        console.log(password);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(user){
                console.log(user);
                alert("Login Success!");
            })
            .catch(function(error){
                console.log('here error');
                var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode === "auth/invalid-email"){
                alert('Wrong Email or password.');
            }else if(errorCode === "auth/user-disabled"){
                alert('This account has been disabled.');
            }else if(errorCode === "auth/user-not-found"){
                alert('Wrong email or password.');
            }else if(errorCode === "auth/wrong-password"){
                alert("Wrong email or password");
            }else{
                alert(errorMessage);
            }
            console.log(error);
        });
        event.preventDefault();
        console.log('here end');
        this.props.history.push('/homepage');
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                if(this.state.authflag){
                    this.setState({uid:user.uid});
                    console.log('user', this.state.uid);
                    this.setState({authflag:false});
                }
            }else{
                console.log('no user'); // Redirect to login
            }
        });
    }

    render(){
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
            </Navbar>

            <br/>
            <br/>

            <MDBContainer>
                <MDBRow>
                    <MDBCol md="3"></MDBCol>
                    <MDBCol md="6">
                        <form onSubmit={this.handleSubmit}>
                            <p className="h4 text-center mb-4">Sign in</p>
                            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="defaultFormLoginEmailEx"
                                className="form-control"
                                onChange={this.handleChange}
                            />
                            <br />
                            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                Your password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="defaultFormLoginPasswordEx"
                                className="form-control"
                                onChange={this.handleChange}
                            />
                            <div className="text-center mt-4">
                                <MDBBtn color="indigo" type="submit">Login</MDBBtn>
                                <MDBBtn color="indigo" onClick={()=> this.props.history.push('/makeaccounts')}>Create an Account</MDBBtn>
                                {/* <Link to="/makeaccounts">Create An Account</Link> */}
                            </div>
                        </form>
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
        );
    }

}

export default LoginPage;