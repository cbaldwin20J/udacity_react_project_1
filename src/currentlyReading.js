import React from 'react'
import The_Li from './orderedList'


class CurrentlyReading extends React.Component {

render() {
    return (
<div className="bookshelf">
  <h2 className="bookshelf-title">Currently Reading</h2>
  <div className="bookshelf-books">
    <ol className="books-grid">
      {this.props.all_with_a_status && this.props.all_with_a_status.filter( book_object => book_object.shelf == "currentlyReading").map((book_object) => (
    
      <The_Li book={book_object} change_status={this.props.change_status} />
    

    ))}
    </ol>
  </div>
</div>

    )
  }
}

export default CurrentlyReading

const names = ['Karen', 'Richard', 'Tyler'];
const shortNamesLengths = names.filter( name => name.length < 6 ).map( name => name.length);