"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let books = [];
// Function to update the book list display
function updateBooksList() {
    const booksList = document.getElementById("books-list");
    booksList.innerHTML = "";
    let totalBooksRead = 0;
    let totalPagesRead = 0;
    books.forEach((book) => {
        const percentageRead = ((book.pagesRead / book.pages) * 100).toFixed(2);
        totalPagesRead += book.pagesRead;
        if (book.finished) {
            totalBooksRead++;
        }
        const bookElement = document.createElement("div");
        bookElement.className = "border border-gray-300 rounded p-3 mb-3";
        bookElement.innerHTML = `
            <h3 class="font-bold">${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages} (Read: ${book.pagesRead} - ${percentageRead}%)</p>
            <p>Status: ${book.status}</p>
            <p>Format: ${book.format}</p>
            <p>Price: $${book.price}</p>
            <p>Suggested By: ${book.suggestedBy}</p>
            <p class="${book.finished ? "text-green-500" : "text-red-500"}">Status: ${book.finished ? "Finished" : "Not Finished"}</p>
        `;
        booksList.appendChild(bookElement);
    });
    document.getElementById("summary").innerText = `Total Books Read: ${totalBooksRead}, Total Pages Read: ${totalPagesRead}`;
}
// Function to fetch all books from the API
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("/api/books");
            books = yield response.json();
            updateBooksList();
        }
        catch (error) {
            console.error("Error fetching books:", error);
        }
    });
}
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    fetchBooks(); // Fetch the books on page load
    // Handle form submission
    const bookForm = document.getElementById("book-form");
    if (bookForm) {
        bookForm.addEventListener("submit", function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                const title = document.getElementById("title").value;
                const author = document.getElementById("author").value;
                const pages = parseInt(document.getElementById("pages").value);
                const status = document.getElementById("status").value;
                const price = parseFloat(document.getElementById("price").value);
                const pagesRead = Math.min(parseInt(document.getElementById("pagesRead").value), pages);
                const format = document.getElementById("format").value;
                const suggestedBy = document.getElementById("suggestedBy").value;
                const finished = pagesRead === pages;
                const newBook = {
                    title,
                    author,
                    pages,
                    status,
                    price,
                    pagesRead,
                    format,
                    suggestedBy,
                    finished,
                };
                // Send the new book to the server
                try {
                    const response = yield fetch("/api/books", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newBook),
                    });
                    if (!response.ok) {
                        throw new Error("Failed to add book");
                    }
                    const addedBook = yield response.json();
                    books.push(addedBook); // Update the local book list with the added book
                    updateBooksList();
                }
                catch (error) {
                    console.error("Error adding book:", error);
                }
                // Clear the form
                document.getElementById("book-form").reset();
            });
        });
    }
});
