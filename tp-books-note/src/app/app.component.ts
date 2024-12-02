import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

class Book {
  constructor(public name: string, public isRead: boolean) {}
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP Angular Books';
  books: Book[] = [
    new Book('Atomic Habits', true),
    new Book(`You Can't hurt me`, true),
    new Book('The Great Gatsby', false)
  ];
  filter: string = 'All';

  get filteredBooks(): Book[] {
    if (this.filter === 'All') {
      return this.books;
    }
    return this.books.filter(book => this.filter === 'read' ? book.isRead : !book.isRead);
  }

  onCheckboxChange(book: Book) {
    book.isRead = !book.isRead;
  }
}
