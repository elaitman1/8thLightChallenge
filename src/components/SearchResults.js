import React from 'react'

const SearchResults = (props) => 
    <section className="bookList">
        {props.mapThroughList(props.books)}
    </section>
    
export default SearchResults