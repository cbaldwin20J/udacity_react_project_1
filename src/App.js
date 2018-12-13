import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Header from './header'
import CurrentlyReading from './currentlyReading'
import WantToRead from './wantToRead'
import AlreadyRead from './alreadyRead'
import SearchPage from './searchPage'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'




class BooksApp extends React.Component {
  state = {
    search_input : "",
    search_results : "",
    all_with_a_status : [],
    first_load: true
  }

  

  componentDidMount() {
    if(this.state.first_load){
      BooksAPI.getAll()
        .then((books) => {
          const all_with_a_status_array = books.filter(book => book.shelf == "currentlyReading" || book.shelf == "wantToRead" || book.shelf == "read")
            this.setState((currentState) => ({
              first_load:false,
              all_with_a_status: all_with_a_status_array
        }))
        })
    }

  }



  updateSearch = (search_input) => {
    let final_results = '';
    BooksAPI.search(search_input)
      .then((results) => {
        console.log("***********the results", results)
        
        if(results.error == "empty query"){
          final_results = "has_error";
        }else{
          final_results = results;
        }
        
        this.setState((currentState) => ({
          search_results: final_results
        }))
      })
    }

updateInput = (e) => {
    const new_input = e.target.value
    console.log("************new_input", new_input)
    this.setState((currentState) => ({
          search_input: new_input
        }), this.updateSearch(new_input))
  }


updateDatabase_and_state = (book, shelf) => {
  BooksAPI.update(book, shelf)
    .then(() => {
      const array_without_object = this.state.all_with_a_status.filter( book_object => book_object != book)
      book.shelf = shelf
      let final_updated_array = ""
      if(shelf == "none"){

        final_updated_array = array_without_object

      }else{

        final_updated_array = array_without_object.concat(book)

      }
      if(final_updated_array){
        console.log("got past 3", final_updated_array)
        this.setState((currentState) => ({
          all_with_a_status: final_updated_array
        }))

      }
      

    })
}


change_status = (the_book_object, e) => {

  console.log("got past 1")
    if(e.target.value == "currentlyReading" || e.target.value == "wantToRead" || e.target.value == "read" || e.target.value == "none"){
      console.log("got past 2")
      this.updateDatabase_and_state(the_book_object, e.target.value)

    }
  }

  render() {
    return (
      
      <div className="app">

        <Route exact path='/search' render={({ history }) => (
          <SearchPage history={history}
                      all_with_a_status={this.state.all_with_a_status}
                      change_status={this.change_status}
                      updateInput={this.updateInput}
                      search_results = {this.state.search_results}
                      search_input = {this.state.search_input}/>
          
        )} />

        <Route exact path='/' render={({ history }) => (
          <div className="list-books">

            <Header />

            <div className="list-books-content">
              <div>
                <CurrentlyReading all_with_a_status={this.state.all_with_a_status}
                                  change_status={this.change_status}
                                  />
                
                <WantToRead all_with_a_status={this.state.all_with_a_status}
                            change_status={this.change_status}
                                  />
                
                <AlreadyRead all_with_a_status={this.state.all_with_a_status}
                             change_status={this.change_status}
                                  />
              </div>
            </div>

            <div className="open-search">
              <button onClick={() => history.push('/search')}>Add a book</button>
            </div>

          </div>
          
        )} />

          

          

        
      </div>
      
    )
  }
}

export default BooksApp
