import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
  };

  componentDidMount() {
    this.getUserBooks();
  }

  getUserBooks() {
    BooksAPI.getAll().then(result => {
      let readBooks = result.filter(item => {
        return item.shelf === "read";
      });
      let wantToReadBooks = result.filter(item => {
        return item.shelf === "wantToRead";
      });
      let currentlyReadingBooks = result.filter(item => {
        return item.shelf === "currentlyReading";
      });

      this.setState({ readBooks, wantToReadBooks, currentlyReadingBooks });
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      console.log(response);
      this.getUserBooks();
    });
  };

  render() {
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
