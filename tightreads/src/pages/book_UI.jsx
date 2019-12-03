import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import {MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { getGoogleBook} from '../google.js';
import firebase from "../firebase";

class Book_UI extends Component {
	constructor(props){
		super(props);
		this.state = {   
            id: "",
            query: "",
			title: 'BOOK TITLE',
            subtitle: '',
			author: 'BOOK AUTHOR',
			genre: 'BOOK GENRE',
			summary: 'This is the book sumary... blah blah blah...',
            artwork: "https://via.placeholder.com/500",
			authflag:true,
			uid:'',
            link: '',

		};
		this.handleChange = this.handleChange.bind(this);
		this.Search = this.Search.bind(this);
		this.submitFavoriteBook = this.submitFavoriteBook.bind(this);
	}


	submitFavoriteBook() {

		firebase.database().ref('users/'+ this.state.uid).child('Favorites').update
		({
			0: this.state.id
		})
	}
	  
	handleChange(event) {    //Event change handler will set our state variables
		this.setState({[event.target.name]: event.target.value});
	}




	Search(event){
		event.preventDefault();
		console.log(this.state.query);
		this.props.history.push({pathname:'/books',state:{query:this.state.query}});
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

				<div class="container">




					<div class="row">
						<div class="col-sm-4">
							<img src={this.state.artwork} alt='book image' width={350} height={500} mode='fit'/>
						</div>

						<div class="col-sm-8">
							<h1>
								<strong>{this.state.title} </strong>
								<br/>{this.state.subtitle}
							</h1>
							<h5>
								<b>Author: </b> {this.state.author} 
							</h5>
							<h5>
								<b>Genre: </b> {this.state.genre} 
							</h5>
							<h5>
								<b>Summary:</b> 
							</h5>
							<p>
								{this.state.summary} 
							</p>
							<Button variant="info" size="sm" onClick={()=>
                                window.open(this.state.link)
                                }>
                                See this book on Google Books
                            </Button>
							
							{/* Add current book's key to database with indexed key */}
							<Button variant='info' size='sm' onClick={this.submitFavoriteBook}>
								Favorite 
							</Button>

								 {/* Delete current book  */}
							<Button variant='info' size='sm' onClick={()=>
                                     firebase.database().ref('users/'+ this.state.uid).child('Favorites').child(0).remove()
                                 }>
								Remove from favorites 
							</Button>

						</div>
					</div>
				</div>
			</>
		);
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
				this.props.history.push('/');
			}
		});
	    var id;
	    if(this.props.location.state.id != null){
	        id = this.props.location.state.id;
        }else {
            id = "HestSXO362YC";//this.props.match.params;
        }

        this.setState({
            id: id,
        });
        getGoogleBook(id).then(data => {
            console.log(data)
            this.setState({
                title: (data.volumeInfo.title) ? data.volumeInfo.title : '',
                subtitle: (data.volumeInfo.subtitle) ? data.volumeInfo.subtitle : '',
                author: (data.volumeInfo.authors) ? data.volumeInfo.authors[0] : '',
                genre: (data.volumeInfo.categories) ? data.volumeInfo.categories[0]  : '',
                summary: (data.volumeInfo.description) ? data.volumeInfo.description : '',
                artwork: (data.volumeInfo.imageLinks) ? data.volumeInfo.imageLinks.thumbnail : '',
                link: (data.volumeInfo.previewLink) ? data.volumeInfo.previewLink : '',
            });
        });
    }
}

export default Book_UI;

