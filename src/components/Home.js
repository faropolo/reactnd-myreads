import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

export default function Home({ shelfs, changeShelf }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelfs).map(key => {
            let shelf = shelfs[key];

            return <BookShelf {...shelf} changeShelf={changeShelf} />;
          })}
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
