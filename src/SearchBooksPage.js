import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelves from "./bookshelves";
import * as BooksAPI from "./BooksAPI";

class Search_Books_Page extends Component {
  state = {
    searchBooksList: [],
  };

  searchBooks = (query) => {
    if (query === "") query = " ";

    BooksAPI.search(query).then((i) => {
      this.setState({
        searchBooksList:
          i != null && !i.error
            ? i.filter(
                (i) => i.imageLinks != null && i.imageLinks.thumbnail != null
              )
            : [],
      });
    });
  };

  render() {
    const { shelfChanger } = this.props;
    const { searchBooksList } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="button close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              onChange={(event) => {
                this.searchBooks(event.target.value.trim());
              }}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BookShelves
              BooksList={searchBooksList}
              shelfChanger={shelfChanger}
            />
          </ol>
        </div>
      </div>
    );
  }
}

export default Search_Books_Page;
