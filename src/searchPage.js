import React from 'react'
import * as BooksAPI from './BooksAPI'
import The_Li from './orderedList'

class SearchPage extends React.Component {

  render() {
    
    return (  
<div className="search-books">
  <div className="search-books-bar">
    <button className="close-search" onClick={() => this.props.history.push('/')}>Close</button>
    <div className="search-books-input-wrapper">
      {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}


      <input type="text" placeholder="Search by title or author" value={this.props.search_input}
      onChange={this.props.updateInput}/>

    </div>
  </div>

  <div className="search-books-results">
    <ol className="books-grid">
  {this.props.search_results && this.props.search_results.filter( book_object =>  !this.props.all_with_a_status.includes(book_object)).map((match) => (
    
      <The_Li book={match} change_status={this.props.change_status} />
    

    ))}
  </ol>
</div>


</div>

    )
  }
}

export default SearchPage
 