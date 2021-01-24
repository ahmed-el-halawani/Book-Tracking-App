import React, { Component } from "react";
import Book from "./book";

class BookShelves extends Component {
  render() {
    const { shelfTitle, BooksList, shelfChanger } = this.props;
    console.log("bookList  :  " + typeof BooksList);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {shelfTitle != null && shelfTitle.value}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {BooksList.map((bookObject) =>
              !shelfTitle ? (
                <li key={bookObject.id}>
                  <Book bookObject={bookObject} shelfChanger={shelfChanger} />
                </li>
              ) : (
                bookObject.shelf === shelfTitle.key && (
                  <li key={bookObject.id}>
                    <Book bookObject={bookObject} shelfChanger={shelfChanger} />
                  </li>
                )
              )
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelves;
