import React, { Component } from 'react';
import Gallery from './gallery';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import {Link, Redirect} from "react-router-dom";

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            query: '',
            items: [],
            lastQuery: ''
        };
    }
    search(){
        const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?q=';
        fetch(`${BASE_URL}${this.state.query}`, {method: 'GET'})
        .then(response => response.json())
        .then(json => {
            let {items} = json;
            this.setState({items});
            this.setState({lastQuery : this.state.query });
            console.log(json);
        });
    }

    render () {
        return (
            <div >
                <gallery />
            </div>
        );
    }


}

export default Search;