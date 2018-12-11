import React from 'react'


const The_Li = (props) => (
<li key={props.book.title}>
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+props.book.imageLinks.smallThumbnail+')' }}></div>
      <div className="book-shelf-changer">
        <select onChange={(e) => props.change_status(props.book, e)}>
          <option value="move" disabled selected>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{props.book.title}</div>
    <div className="book-authors">{props.book.authors}</div>
  </div>
</li>

)

export default The_Li

