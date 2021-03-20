// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// UI Add Book to List
UI.prototype.addBookToList = function(book) {
  const row = document.createElement('tr');
  row.className = 'delete'
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#">X</a></td>
  `

  document.querySelector('.book-list').appendChild(row);
}

// UI Remove Book From List
UI.prototype.removeBookFromList = function(target) {
  if (target.parentElement.parentElement.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// UI Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('book-title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// UI Show Alert
UI.prototype.showAlert = function(className, message) {
  const msg = document.createElement('p');
  msg.innerHTML = message;

  if (className === 'success') {
    msg.className = 'alert success';
  } else {
    msg.className = 'alert failed';
  }

  document.querySelector('.container').insertBefore(msg, document.querySelector('.display-3'));

  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
};

// Event Listeners

// Add Book
document.querySelector('#book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('book-title').value;
        author = document.getElementById('author').value;
        isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('failed', 'Please fill in all forms!');
  } else {
    ui.addBookToList(book);
    ui.clearFields();
    ui.showAlert('success', 'Book is succesfully added!');
  }

  e.preventDefault();
});

// Remove Book
document.querySelector('.book-list').addEventListener('click', function(e) {
  const ui = new UI();
  ui.removeBookFromList(e.target);
  ui.showAlert('success', 'Book is successfully removed.')

  e.preventDefault();
});