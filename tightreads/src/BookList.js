import React from 'react';
import ReactDOM from 'react-dom';
import {CardDeck, Card, Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Rating from './Rating';
import StarRatingComponent from 'react-star-rating-component';


//renders google books API data on UI
const BookList = props =>
{

    return (

        <CardDeck>
            {/* renders out individual book cards */}
            {
                props.books.map((book, i) => {
                    return(<Card>
                        <Card.Img variant="top" src={book.volumeInfo.imageLinks.thumbnail} />
                        <Card.Body>
                            <Card.Title>{book.volumeInfo.title}</Card.Title>
                            <Card.Text>
                                {book.volumeInfo.authors}

                                {/* <Button variant="outline-secondary" size="sm">Secondary</Button> */}
                                
                                <div>
        {/* <h2>Rating from state: {rating}</h2> */}
        {/* <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        /> */}
        <Rating/>
      </div>

                                
                                </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {/* <small className="text-muted">Genre</small> */}
                            <Button variant="secondary" size="sm" onClick={()=>
                                props.history.push({pathname:'/bookprofile', state:{id:book.id}})
                            }>
                                More Info
                            </Button>

                        </Card.Footer>
                    </Card>)



                })

            }

        </CardDeck>
   
        
    )

    

};
export default withRouter(BookList);