import bookDescription from "./books.js";

const books = bookDescription();

let bookshelf = document.getElementById("bookshelf");

for (let i = 0; i < books.length; i++) {
  let book = books[i];

  const newBook = document.createElement("section");
  newBook.className = "books";

  newBook.innerHTML = `
<h1 class='book-title'>${book.title}</h1>

<a href='${book.link}'>
<img src='${book.imageUrl}' alt='${book.title}' class='image'>
</a>


<h2 class='author'>${book.author}</h2>
<h3 class='status'>${book.alreadyRead ? "✅ Read" : "❌ Not Read"}</h3>

`;

  bookshelf.appendChild(newBook);
}
