import React from 'react'
import * as BooksAPI from './BooksAPI'
import The_Li from './orderedList'

class SearchPage extends React.Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* Will take user back to homepage */}
          <button className="close-search" onClick={() => this.props.history.push('/')}>Close</button>

          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" value={this.props.search_input}
            onChange={this.props.updateInput}/>

          </div>
        </div>

        <div className="search-books-results">
          {/* If the search results returns an error/is empty or has book objects */}
          {this.props.search_results == "has_error"? <h1>No results found</h1>:
            <ol className="books-grid">
              {this.props.search_results && this.props.search_results.map((match) => (

                <The_Li book={match} change_status={this.props.change_status} key={match.id}/>

              ))}
            </ol>
          }
        </div>
      </div>
    )
  }
}

export default SearchPage
