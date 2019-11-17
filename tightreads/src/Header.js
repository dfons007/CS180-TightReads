import React, {Component} from 'react';
import Books from './Books';

const Header = ()=>
{
    return (

        <header>
                
            <i className="fas fa-book fa-2x"></i>
            <h1>Book Cards</h1>
            <Books />

        </header>  

   
        
    )

    

}

export default Header;