import React, {Component} from 'react';
import SearchArea from './SearchArea';
import request from 'superagent';
import BookList from './BookList';


//contains all the book search logic
class Books extends Component
{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            searchField: ''
            // lastQuery: ''
        };
    }    

    handleSearch = (e) =>
    {
        console.log(e.target.value)
        this.setState({searchField: e.target.value})
    }

    // handles requests from google books API
    searchBook = (e) =>
    {
        e.preventDefault();
        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query({ q: this.state.searchField})
            .then((data) =>
            {
                console.log(data);
                this.setState({books: [...data.body.items]})

            })
            .catch((err) => {console.log(err)});

    }

  render()
  {
    return(
      <div >
          {/* passes in handleSearch and searchBook method */}
          <SearchArea searchBook={this.searchBook} handleSearch={this.handleSearch} />
          {/* passes data in state to BookList Component */}
          <BookList books={this.state.books} />
      </div>
    );

  }

}

export default Books;