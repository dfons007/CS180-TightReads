import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";

class Book_UI extends Component {
	constructor () {
		super();
		this.state = {   
			title: 'BOOK TITLE',
			author: 'BOOK AUTHOR',
			genre: 'BOOK GENRE',
			summary: 'This is the book sumary... blah blah blah...'

		};
	}

	render() {
		 return (
    <MDBCard className="my-5 px-5 pb-5">
      <MDBCardBody>
        <MDBRow>
          <MDBCol lg="5">
            <MDBView >
              <img src="https://via.placeholder.com/500" />
            </MDBView>
          </MDBCol>
          <MDBCol lg="7">
            <a href="#!" className="green-text">
              <h6 className="font-weight-bold mb-3">
                <MDBIcon icon="book" className="pr-2" />
                Books
              </h6>
            </a>
            <h1>
              <strong>{this.state.title} </strong>
            </h1>
            <h5>
            	<b>Author: </b> 
            	<a href="ENTER HYPERLINK HERE TO AUTHOR">
                	{this.state.author} 
              	</a>
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
            <MDBBtn color="success" size="md">
            	button
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
	}
}


export default Book_UI;

