"use strict";

interface Book {
    title: string;
    author: string;
    pages: number;
    status: "Read" | "Re-read" | "DNF" | "Currently Reading" | "Returned Unread" | "Want to Read";
    price: number;
    pagesRead: number;
    format: "Print" | "PDF" | "Ebook" | "AudioBook";
    suggestedBy: string;
    finished: boolean;
}

let books: Book[] = [];

// Function to update the book list display
function updateBooksList() {
    const booksList = document.getElementById("books-list")!;
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

    document.getElementById("summary")!.innerText = `Total Books Read: ${totalBooksRead}, Total Pages Read: ${totalPagesRead}`;
}

// Function to fetch all books from the API
async function fetchBooks() {
    try {
        const response = await fetch("/api/books");
        books = await response.json();
        updateBooksList();
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    fetchBooks(); // Fetch the books on page load

    // Handle form submission
    const bookForm = document.getElementById("book-form");
    if (bookForm) {
        bookForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const title = (document.getElementById("title") as HTMLInputElement).value;
            const author = (document.getElementById("author") as HTMLInputElement).value;
            const pages = parseInt((document.getElementById("pages") as HTMLInputElement).value);
            const status = (document.getElementById("status") as HTMLSelectElement).value as Book["status"];
            const price = parseFloat((document.getElementById("price") as HTMLInputElement).value);
            const pagesRead = Math.min(parseInt((document.getElementById("pagesRead") as HTMLInputElement).value), pages);
            const format = (document.getElementById("format") as HTMLSelectElement).value as Book["format"];
            const suggestedBy = (document.getElementById("suggestedBy") as HTMLInputElement).value;

            const finished = pagesRead === pages;

            const newBook: Book = {
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
                const response = await fetch("/api/books", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newBook),
                });

                if (!response.ok) {
                    throw new Error("Failed to add book");
                }

                const addedBook = await response.json();
                books.push(addedBook); // Update the local book list with the added book
                updateBooksList();
            } catch (error) {
                console.error("Error adding book:", error);
            }

            // Clear the form
            (document.getElementById("book-form") as HTMLFormElement).reset();
        });
    }
});
