import React from "react";
import BookItem from "./BookItem";

export default function BookShelf({ title, books, changeShelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => {
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
  );
}
