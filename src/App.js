import React from 'react';
import Title from './components/Title'
import SearchBooksForm from './components/SearchBooksForm'
import SearchResults from './components/SearchResults'
import ReadingList from './components/ReadingList'
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
    let { searchField } = this.state
    let term = searchField.trim().toLowerCase()
    
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
    .catch(() => {
      console.log("error");
    });
  }

  handleShowList = () => {
    let { list } = this.state
    this.setState({list:!list})
  }

  handleShowReadingList = () => {
    let {rlist} = this.state
      return rlist.length > 0?
        this.mapThroughList(rlist)
        :
        <h3>No Books In Your Reading List Yet</h3>
  }

  mapThroughList = (l) => {
    let { books } = this.state
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
        <>
        <h2>Title: {v.title}</h2>
        <h2>Author: {v.authors}</h2>        
        <h2>Publisher: {v.publisher}</h2>   
        </>
        
        {l === books?
            <button value={v.title} onClick={this.addToReadingList}>Add to Reading List</button>
          :
            <div style={{border:"solid"}}></div>
          }
        </div>
      })
    )
  }
  
  addToReadingList = (e) => {
    let { books, rlist } = this.state
    let foundBook = books.find(book=>book.volumeInfo.title === e.target.value)
    this.setState({rlist:[...rlist, foundBook]})
  }

  render(){
    let { books, list, searchField } = this.state
    return (
      <>
        <Title />
        <SearchBooksForm 
          searchBook={this.searchBook} 
          handleSearch={this.handleSearch} 
          searchField={searchField}
        />
        <SearchResults 
          mapThroughList={this.mapThroughList} 
          books={books} 
        />
        <ReadingList
          handleShowList={this.handleShowList} list={list} 
          handleShowReadingList={this.handleShowReadingList}
        />
      </>
    )
  };
}

export default App;