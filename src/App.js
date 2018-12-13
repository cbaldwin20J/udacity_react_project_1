import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import Header from './header'
import CurrentlyReading from './currentlyReading'
import WantToRead from './wantToRead'
import AlreadyRead from './alreadyRead'
import SearchPage from './searchPage'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    //search_input is the value in the search bar
    search_input : "",
    //search_results are the book objects returned from the search_input value
    search_results : "",
    //every book object that has been assigned a shelf value other than none
    all_with_a_status : [],
    // if the page is refreshed or first loading to get
    // all_with_a_status from database
    first_load: true
  }

  componentDidMount() {
    // if the site is refreshed or loading for the first time
    if(this.state.first_load){
      BooksAPI.getAll()
        .then((books) => {
          //get only the book objects that was assigned a shelf property
          // other than none
          const all_with_a_status_array = books.filter(book => book.shelf == "currentlyReading" || book.shelf == "wantToRead" || book.shelf == "read")
            this.setState((currentState) => ({
              first_load:false,
              all_with_a_status: all_with_a_status_array
            }))
        })
    }
  }

  // update the book objects in state.search_results when the search_input
  // value is changed
  updateSearch = (search_input) => {
    // final_results will be used in the setState at the bottom
    let final_results = '';

    BooksAPI.search(search_input)
      .then((results) => {
        // if there are no results or results error
        if(!results || results.error == "empty query"){
          final_results = "has_error";
        // if there are results
        }else{
          final_results = [];
          // used_ids is to make sure we don't have duplicates in final_results
          let used_ids = [];
          // go through all of the objects that have a shelf value other than none
          this.state.all_with_a_status.forEach((element_state) => {
            let is_match = 0;
            let counter = 0
            let counter_finish = results.length
            // go over the search results book objects
            results.forEach((element_api) => {
              counter += 1

              if(element_state.id == element_api.id){
                is_match += 1;
              }

              if(counter === counter_finish){
                if(is_match && !used_ids.includes(element_state.id)){
                  // one of the objects with shelf property was in the search results
                  // so we'll put the shelf in our final_results instead
                  final_results.push(element_state)
                  // push to used_ids to avoid duplicates
                  used_ids.push(element_state.id)
                //if its not a match and not a duplicate then put in our final_results
                }else if(!used_ids.includes(element_api.id)){
                  final_results.push(element_api)
                  // avoid duplicates by pushing to used_ids
                  used_ids.push(element_state.id)
                  used_ids.push(element_api.id)
                }
              }

            })// end of results.forEach
          })// end of this.state.all_with_a_status.forEach

          // whatever didn't get looped over above (the leftovers)
          // since the parent and child loop's length are probably not the same
          // then push it to the final_results if not a duplicate
          results.forEach((element_from_api) => {
            // if not in the used_ids array
            if(!(used_ids.includes(element_from_api.id) )){
              final_results.push(element_from_api)
            }
          })

        }//end of else statement above 'final_results = [];'

        // we have our final_results, now set the state
        this.setState((currentState) => ({
          search_results: final_results
        }))
      })
    }

// if user puts a new search input value
updateInput = (e) => {
    const new_input = e.target.value
    this.setState((currentState) => ({
          search_input: new_input
        // now that we updated the search_input
        // run the search API for the matching book objects
    }), this.updateSearch(new_input))
}

// if a book object is assigned a shelf value other than none
// then update personal database
updateDatabase_and_state = (book, shelf) => {
  BooksAPI.update(book, shelf)
    .then(() => {
      // delete the original book object
      const array_without_object = this.state.all_with_a_status.filter( book_object => book_object != book)
      // create the new updated book object
      book.shelf = shelf
      let final_updated_array = ""

      if(shelf == "none"){
        // if none, then leave original book object out of new array
        final_updated_array = array_without_object
      }else{
        // if the shelf is 'read', 'wantToRead', 'currentlyReading'
        final_updated_array = array_without_object.concat(book)
      }

      if(final_updated_array){
        this.setState((currentState) => ({
          all_with_a_status: final_updated_array
        }))
      }
    })// end of .then(()
}

// making sure the updated shelf property fits one of the below values
// before running the updateDatabase_and_state()
change_status = (the_book_object, e) => {
    if(e.target.value == "currentlyReading" || e.target.value == "wantToRead" || e.target.value == "read" || e.target.value == "none"){
      this.updateDatabase_and_state(the_book_object, e.target.value)
    }
  }

  render() {
    return (
      <div className="app">

        {/* The search page */}
        <Route exact path='/search' render={({ history }) => (
          <SearchPage history={history}
                      all_with_a_status={this.state.all_with_a_status}
                      change_status={this.change_status}
                      updateInput={this.updateInput}
                      search_results = {this.state.search_results}
                      search_input = {this.state.search_input}/>
        )} />

      {/* The home page */}
        <Route exact path='/' render={({ history }) => (
          <div className="list-books">

            {/* The header */}
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

          {/* link to go to search page */}
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
