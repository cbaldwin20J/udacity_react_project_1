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
    all_with_a_status : []
  }

  

  updateSearch = (search_input) => {
    BooksAPI.search(search_input)
      .then((results) => {

        const final_array = [];

        

        this.setState((currentState) => ({
          search_results: results
        }))
      })
    }

updateInput = (e) => {
    const new_input = e.target.value
    this.setState(() => ({
          search_input: new_input
        }), this.updateSearch(new_input))
  }


  change_status = (the_book_object, e) => {
    const new_book_object = the_book_object

    const array_without_object = this.state.all_with_a_status.filter( book_object => book_object != the_book_object)
    const search_array_without_object = this.state.search_results.filter( book_object => book_object != the_book_object)

    if(e.target.value == "currentlyReading"){
      the_book_object.current_status = "currently reading"
      this.setState((currentState) => ({
          search_results: search_array_without_object,
          all_with_a_status: array_without_object.concat(the_book_object)
        }))

    }else if(e.target.value == "wantToRead"){
      the_book_object.current_status = "want to read"
      this.setState((currentState) => ({
          search_results: search_array_without_object,
          all_with_a_status: array_without_object.concat(the_book_object)
        }))

    }else if(e.target.value == "read"){
      the_book_object.current_status = "read"
      this.setState((currentState) => ({
          search_results: search_array_without_object,
          all_with_a_status: array_without_object.concat(the_book_object)
        }))

    }else if(e.target.value == "none"){
      this.setState((currentState) => ({
          all_with_a_status: array_without_object
        }))

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
                      search_results = {this.state.search_results}/>
          
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
