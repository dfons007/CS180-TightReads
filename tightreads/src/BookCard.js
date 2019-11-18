import React, {Component} from 'react';
import Books from './Books';

//renders google books API data on UI
const BookCard = (props)=>
{
    return (

        <div className="card-container">
            {/* renders out individual book cards */}
            <img src={props.image} alt="" />
            <div className="desc">
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <p>{props.published}</p>

            </div>

        </div>        
   
        
    )

    

}

export default BookCard;