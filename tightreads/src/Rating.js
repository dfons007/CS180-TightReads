import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import {CardDeck, Card, Button} from 'react-bootstrap';
import BookList from './BookList';

class Rating extends React.Component {
    constructor() {
      super();
  
      this.state = {
        // rating: new Array(book.length).fill(0)
        rating: 0,
      };
    }
  
    // onStarClick(index, nextValue) {
    //   this.setState(prevState => ({rating: [
    //          ...prevState.rating.slice(0, index),
    //          nextValue,
    //          ...prevState.rating.slice(index + 1)
    //      ]
    //  }));
    // }

    onStarClick(nextValue, prevValue, name) {
        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        this.setState({rating: nextValue});
      }
  
    render() {
     const { rating } = this.state;
  
      return (                
        <div>
  
          {/* {books.map((c, index) => ( */}
            <div>
              {/* <p key={c.name}>
                {c.name}
              </p> */}
          <StarRatingComponent 
            name="rate1" 
            starCount={5}

            value={rating}
            onStarClick={this.onStarClick.bind(this)} 
  
          />
            </div>
          {/* ))} */}
        </div>
      );
    }
  }

  export default Rating;