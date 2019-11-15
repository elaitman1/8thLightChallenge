import React from 'react'

const SearchBooksForm = (props) => 
    <section className="search-area">
          <form onSubmit={props.searchBook} >
            <input onChange={props.handleSearch} type="text" placeholder="Search For Your Book" value={props.searchField}/>
            <button type="submit">Search</button>
          </form>
        </section>

export default SearchBooksForm