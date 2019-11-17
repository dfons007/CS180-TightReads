import React, {Component} from 'react';
import Books from './Books';
import BookCard from './BookCard';

//renders google books API data on UI
const BookList = (props)=>
{
    return (

        <div className="list">
            {/* renders out individual book cards */}
            {
                props.books.map((book, i) => {
                    return <BookCard 
                                key={i}
                                image={book.volumeInfo.imageLinks.thumbnail}
                                title={book.volumeInfo.title}
                                author={book.volumeInfo.authors}
                                price={book.saleInfo.saleability}
                                published={book.volumeInfo.publishedDate}
                                summary={book.volumeInfo.description}
                    />

                })

            }

        </div>        
   
        
    )

    

}

export default BookList;