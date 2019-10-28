import React, {Component} from "react";
import firebase from "../firebase";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password:''
        };
        this.handleSubmit = this.handleSubmit.bind(this); // bind event
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (event) {    //Event change handler will set our state variables
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event){
        var email = this.state.email;
        var password = this.state.password;
        console.log(password);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(user){
                console.log(user);
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
    }

    render(){
        return (
            <MDBContainer>
                <MDBRow>
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
                                <MDBBtn color="indigo" type="sumbit"><Link to="/makeaccounts">Create An Account</Link></MDBBtn>
                                {/* <Link to="/makeaccounts">Create An Account</Link> */}
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }

}

export default LoginPage;