## Overview

The Book Reading Tracker application allows users to register books they are reading or want to read. For each book, details like title, author, number of pages, reading status, format, and more are stored. The application updates and displays this information dynamically.

## Setup

1. Clone the repository and navigate to the project directory.
    

```bash
git clone https://github.com/Hikaru-e/JS-Technology-TPs.git 
cd BookReadingTracker
```
    
2. install dependencies with

```bash
npm install
```
    
3. To run the project, use either of these commands
```bash
npm run dev
npm run start
```
might as well rebuild your .ts file using 
```bash
npx tsc
```

## Features

- **Book Registration**: Add a new book with details like title, author, pages, status, price, pages read, format, and suggested by.
- **Reading Progress Tracking**: Track pages read, with visual cues for reading progress and completion status.
- **Summarized Book List**: Shows all books with their details and a summary of books read and pages read.
- **Dynamic Update**: All interactions and updates are handled dynamically using TypeScript.