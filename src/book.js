import React, { Component } from "react";

class Book extends Component {
  render = () => {
    const { bookObject, shelfChanger } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `URL(${bookObject.imageLinks.thumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              defaultValue={bookObject.shelf ? bookObject.shelf : "none"}
              onChange={(event) => shelfChanger(bookObject, event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookObject.title}</div>
        {bookObject.authors &&
          bookObject.authors.map((element) => (
            <div key={element} className="book-authors">
              {element}
            </div>
          ))}
      </div>
    );
  };
}

export default Book;
