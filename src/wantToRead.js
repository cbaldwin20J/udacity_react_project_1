import React from 'react'
import The_Li from './orderedList'


class WantToRead extends React.Component {

render() {
    return (

<div className="bookshelf">
  <h2 className="bookshelf-title">Want to Read</h2>
  <div className="bookshelf-books">
    <ol className="books-grid">

      {this.props.all_with_a_status && this.props.all_with_a_status.filter( book_object => book_object.current_status == "want to read").map((book_object) => (
    
      <The_Li book={book_object} change_status={this.props.change_status} />
    

    ))}

    </ol>
  </div>
</div>
    )
  }
}

export default WantToRead
