import React from 'react'
import The_Li from './orderedList'

// the 'currently reading' section on the home page
class CurrentlyReading extends React.Component {
  render() {
      return (
  <div className="bookshelf">
    <h2 className="bookshelf-title">Currently Reading</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {/* Will get the book objects that have a 'currentlyReading' shelf property */}

        {this.props.all_with_a_status && this.props.all_with_a_status.filter( book_object => book_object.shelf == "currentlyReading").map((book_object) => (
          <The_Li book={book_object} change_status={this.props.change_status} key={book_object.id} />
        ))}
      </ol>
    </div>
  </div>
      )
  }
}

export default CurrentlyReading

