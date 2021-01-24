import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import BookShelves from "./bookshelves";
import Search_Books_Page from "./SearchBooksPage";

import { Link, Switch, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    query: "",

    bookshelves: [
      {
        key: "currentlyReading",
        value: "Currently Reading",
      },
      {
        key: "wantToRead",
        value: "Want to Read",
      },
      {
        key: "read",
        value: "Read",
      },
    ],
    BooksList: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        BooksList: books,
      });
    });
  }

  shelfChanger = (book, shelf) => {
    let iHaveThisBook = false;
    this.state.BooksList.forEach((element) => {
      if (book.id === element.id) {
        iHaveThisBook = true;
      }
    });

    !iHaveThisBook && this.state.BooksList.push(book);

    this.setState((oldState) => {
      return {
        BooksList: oldState.BooksList.map((i) => {
          i.id === book.id && (i.shelf = shelf);
          return i;
        }),
      };
    });
    BooksAPI.update(book, shelf).catch((i) => {
      this.setState({ BooksList: i });
    });
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search" exact>
            <Search_Books_Page
              shelfChanger={this.shelfChanger}
            ></Search_Books_Page>
          </Route>
          <Route path="/" exact>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.bookshelves.map((element) => (
                    <BookShelves
                      key={element.key}
                      shelfTitle={element}
                      BooksList={this.state.BooksList}
                      shelfChanger={this.shelfChanger}
                    ></BookShelves>
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link className="button" to="/search">
                  Add a book
                </Link>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
