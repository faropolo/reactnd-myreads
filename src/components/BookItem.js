import React from "react";

export default function BookItem({
  id,
  imageLinks,
  title,
  authors,
  shelf,
  changeShelf
}) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageLinks.thumbnail}")`
          }}
        />
        <div className="book-shelf-changer">
          <select
            onChange={e => changeShelf(e.currentTarget.value)}
            defaultValue={shelf}
          >
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="None">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(", ")}</div>
    </div>
  );
}
