import React from 'react';
import {CardDeck, Card, Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import firebase from "./firebase"

//renders google books API data on UI
const BookList = props =>
{   
    console.log("props.authors")
    console.log(props.authors)
    return (
        <CardDeck>
            {/* renders out individual book cards */}
            {
                props.books.map((book, i) => {
                    var image = book.volumeInfo.imageLinks.thumbnail
                    var imageStyle = {}
                    
                    if(book.volumeInfo.authors && props.authors[book.volumeInfo.authors[0]])
                    {
                        if(props.authors[book.volumeInfo.authors[0]] == "black")
                        {
                            imageStyle = {filter: "grayscale(100%) blur(5px)"}
                        }
                        
                        else if(props.authors[book.volumeInfo.authors[0]] == "white")
                        {
                            imageStyle = {
                                    filter: "contrast(120%)",
                                    //x, y, (edge)blur, spread(size), color,
                                    "boxShadow": "0px 0px 3px 4px rgba(255,255,0,0.4), 0px 0px 3px 8px rgba(0,255,255,0.4), 0px 0px 3px 12px rgba(255,0,255,0.4)"
                                    }
                        }
                    }
                    console.log("authors")
                    console.log(props.authors)
                    console.log(imageStyle)
                    return(<Card>
                        <Card.Img variant="top" src={image} style={imageStyle} />
                        <Card.Body>
                            <Card.Title>{book.volumeInfo.title}</Card.Title>
                            <Card.Text>
                                {book.volumeInfo.authors}

                                {/* <Button variant="outline-secondary" size="sm">Secondary</Button> */}

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