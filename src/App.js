import React from 'react';
import './App.css';


class App extends React.Component{

  state = {
    books: [],
    searchField:"",
    list:false,
    rlist:[],
  }

  handleSearch = (e) => {
    this.setState({searchField: e.target.value})
  }

  searchBook = async (e) => {
    e.preventDefault()
    let term = this.state.searchField.trim().toLowerCase()
    
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}`)
    .then(r => r.json())
    .then(r => {
      if (r.items.length > 5){
        r = r.items.slice(0,5)
        this.setState({ books: r, searchField:""}) 
      }else{
        this.setState({ books: r.items, searchField:""})
      }
    })
  }

  handleShowList = () => {
    this.setState({list:!this.state.list})
  }

  handleShowReadingList = () => {
    let {rlist} = this.state
      return rlist.length > 0?
        this.mapThroughList(rlist)
        :
        <h3>No Books In Your Reading List Yet</h3>
  }

  mapThroughList = (l) => {
    return (
      l.map(book =>{
        let v = book.volumeInfo
        let n = "Not Listed"
        let u = undefined
        if(v.publisher === u){
          v.publisher = n
        }
        if(v.title === u){
          v.title = n
        }
        if(v.authors === u){
          v.authors = n
        }

        return <div className="searchedBooks">
          <div>
          <h2>Title: {v.title}</h2>
          <h2>Author: {v.authors}</h2>        
          <h2>Publisher: {v.publisher}</h2>   
        </div>
        {l === this.state.books?
            <button value={v.title} onClick={this.addToReadingList}>Add to Reading List</button>
          :
            <></>
          }
        </div>
      })
    )
  }
  
  addToReadingList = (e) => {
    let foundBook = this.state.books.find(book=>book.volumeInfo.title === e.target.value)
    this.setState({rlist:[...this.state.rlist, foundBook]})
  }


  render(){
    let { books, list } = this.state

    return (
      <div className="App">
        <header>
          <h1>Find Your Book</h1>
        </header>

        <section className="search-area">
          <form onSubmit={this.searchBook} >
            <input onChange={this.handleSearch} type="text" placeholder="Search" value={this.state.searchField}/>
            <button type="submit">Search</button>
          </form>
        </section>
        
        <section className="bookList">
        {this.mapThroughList(books)}
        </section>

        <section className="readingList">
        <button onClick={this.handleShowList}>
          {list? 
            <p><u>Hide</u> My Reading List</p>
          :
            <p><u>View</u> My Reading List</p>
          }
        </button>
        
          {list? 
            <div>{this.handleShowReadingList()}</div>
          :
            <></>
          }
        </section>

      </div>
    )
  };
}

export default App;