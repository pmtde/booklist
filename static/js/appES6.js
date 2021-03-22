class Book {
  constructor(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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

  removeBookFromList(target) {
    if (target.parentElement.parentElement.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('book-title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert(className, message) {
    const msg = document.createElement('p');
    msg.innerHTML = message;

    if (className === 'success') {
    msg.className = 'alert success';
    } else if (className === 'failed'){
    msg.className = 'alert failed';
    } else {
    msg.className = 'alert info';
    }

    document.querySelector('.container').insertBefore(msg, document.querySelector('.display-3'));

    setTimeout(function(){
    document.querySelector('.alert').remove();
    }, 2000);
  }
}

// Local Storgae Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;

      ui.addBookToList(book);
    })
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event Listeners

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
    Store.addBook(book);
    ui.clearFields();
    ui.showAlert('success', `${title} is succesfully added!`);
  }

  e.preventDefault();
});

// Remove Book
document.querySelector('.book-list').addEventListener('click', function(e) {
  const ui = new UI();
  ui.removeBookFromList(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('info', 'Book is successfully removed.')

  e.preventDefault();
});


// var updateBtns = document.getElementsByClassName('update-book')

// for (i = 0; i < updateBtns.length; i++) {
// 	updateBtns[i].addEventListener('click', function(){
// 		var title = this.dataset.title
// 		var author = this.dataset.author
//     var isbn = this.dataset.isbn
//     var action = this.dataset.action

// 		console.log('title:', title, 'author:', author, 'isbn:', isbn, 'action:',action )

//     if (user === 'AnonymousUser'){
// 			  console.log('User anonymous')
// 		}else{
//         updateUserBook(title, author, isbn, action)
//     }
// 	})
// }

// function updateUserBook(title, author, isbn, action){

//     var url = '/update_book/'

//     fetch(url, {
//       headers:{
//         method:'POST',
//         headers:{
//           'Content-Type': 'application/json',
//           // 'X-CSRFToken':csrftoken,
//         },

//         body:JSON.stringify({'title': title, 'author:': author,'isbn': isbn, 'action':action})
//       }
//     })

//     .then((response) =>{
//       return response.json()
//     })

// }