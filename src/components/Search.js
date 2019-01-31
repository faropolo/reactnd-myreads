import React, { Component } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";
import BookItem from "./BookItem";
import * as BooksAPI from "../BooksAPI";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: null
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(result => {
      let booksOnShelf = result.reduce((booksOnShelf, item) => {
        booksOnShelf.push({ id: item.id, shelf: item.shelf });
        return booksOnShelf;
      }, []);

      this.setState({ booksOnShelf });
    });
  }

  search(query) {
    search(query).then(result => {
      if (result.error) return;

      result = result.map(item => {
        let bookShelf = this.state.booksOnShelf.find(book => {
          return item.id === book.id;
        });
        if (bookShelf) {
          item.shelf = bookShelf.shelf;
        } else {
          item.shelf = "none";
        }

        return item;
      });

      console.log(result);
      this.setState({ searchResult: result });
    });
  }

  onChange = e => {
    const { value } = e.currentTarget;
    if (this.searchRequestTimer) {
      clearTimeout(this.searchRequestTimer);
      this.searchRequestTimer = null;
    }
    this.searchRequestTimer = setTimeout(() => {
      this.search(value);
    }, 2000);
  };

  render() {
    const { searchResult } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult &&
              searchResult.map(book => {
                return (
                  <li key={book.id}>
                    <BookItem
                      {...book}
                      changeShelf={shelf => this.props.changeShelf(book, shelf)}
                    />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
