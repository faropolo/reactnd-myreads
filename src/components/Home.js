import React from "react";
import BookItem from "./BookItem";
import { Link } from "react-router-dom";

export default function Home({
  currentlyReadingBooks,
  wantToReadBooks,
  readBooks,
  changeShelf
}) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentlyReadingBooks.map(book => {
                  return (
                    <li key={book.id}>
                      <BookItem
                        {...book}
                        changeShelf={shelf => changeShelf(book, shelf)}
                      />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToReadBooks.map(book => {
                  return (
                    <li key={book.id}>
                      <BookItem
                        {...book}
                        changeShelf={shelf => changeShelf(book, shelf)}
                      />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {readBooks.map(book => {
                  return (
                    <li key={book.id}>
                      <BookItem
                        {...book}
                        changeShelf={shelf => changeShelf(book, shelf)}
                      />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}
