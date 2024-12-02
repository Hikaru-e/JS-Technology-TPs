# TP Angular Books

A simple Angular application for managing a reading list. This project demonstrates basic Angular concepts including components, data binding, and filtering.

## Features

- Display a list of books
- Mark books as read/unread
- Filter books by reading status (All/Read/Unread)
- Responsive design

## Project Structure

```
src/
├── app/
│   ├── app.component.ts        # Main component logic
│   ├── app.component.html      # Component template
│   ├── app.component.css       # Component styles
│   └── book.model.ts          # Book class definition
└── package.json               # Project dependencies
```

## Installation

1. Clone the repository `git clone https://github.com/Hikaru-e/JS-Technology-TPs.git` and navigate to the project directory `cd tp-books-note`
2. Run `npm install` to install dependencies
3. Run `ng serve` to start the development server
4. Navigate to `http://localhost:4200/`

## Usage

- Select filter options from the dropdown to view All/Read/Unread books
- Toggle the checkbox next to a book to mark it as read/unread
- The list updates automatically based on filter selection
