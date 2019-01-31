import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    shelfs: {
      currentlyReadingBooks: {
        title: "Currently Reading",
        books: []
      },
      wantToReadBooks: {
        title: "Want to Read",
        books: []
      },
      readBooks: {
        title: "Read",
        books: []
      }
    }
  };

  componentDidMount() {
    this.getUserBooks();
  }

  getUserBooks() {
    BooksAPI.getAll().then(result => {
      let {
        readBooks,
        wantToReadBooks,
        currentlyReadingBooks
      } = this.state.shelfs;

      readBooks.books = result.filter(item => {
        return item.shelf === "read";
      });

      wantToReadBooks.books = result.filter(item => {
        return item.shelf === "wantToRead";
      });

      currentlyReadingBooks.books = result.filter(item => {
        return item.shelf === "currentlyReading";
      });

      this.setState({
        shelfs: {
          currentlyReadingBooks,
          wantToReadBooks,
          readBooks
        }
      });
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getUserBooks();
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={props => (
              <Search {...this.state} changeShelf={this.changeShelf} />
            )}
          />
          <Route
            path="/"
            render={props => (
              <Home {...this.state} changeShelf={this.changeShelf} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
