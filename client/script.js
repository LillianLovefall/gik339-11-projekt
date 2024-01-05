const url = 'http://localhost:3000/books';

window.addEventListener('load', fetchData);

function fetchData() {
    fetch(url)
      .then((result) => result.json())
      .then((books) => {
        const bookListElement = document.getElementById('bookList');
        if (books.length > 0) {
          let html = `<ul class="grid grid-cols-3 justify-center">`;
          books.forEach((book) => {
            let genreColor = '';
            switch(book.bookGenre){
              case 'Crime/Thriller':
                genreColor = 'red';
                break;
              case 'Adventure':
                genreColor = 'lime';
                break;
              case 'Sci-fi/Fantasy':
                genreColor = 'indigo';
                break;
              case 'Childrens':
                genreColor = 'teal';
                break;
              case 'Romance':
                genreColor = 'orange';
                break;
              default:
                genreColor = 'gray';
                break;
            }

            html += `
            <li id="${book.id}" class="flex bg-${genreColor}-100 border-${genreColor}-300 flex-col h-[300px] border-2 p-6">
                <div class="flex flex-wrap items-baseline">
                  <h1 class="w-full flex-none text-2xl leading-none text-${genreColor}-900">
                      ${book.bookTitle}
                  </h1>
                  <div class="flex-auto text-lg font-medium text-${genreColor}-600">
                      ${book.bookPrice} kr
                  </div>
                  <div class="text-xs leading-6 font-medium uppercase text-${genreColor}-600">
                      ISBN: ${book.bookIsbn}
                  </div>
                </div>
                <div class="flex grid grid-cols-1 items-baseline mt-4 mb-6 pb-6 border-b border-${genreColor}-400">
                  <div class="space-x-1 flex text-sm font-medium">
                    <p class="text-xs leading-6 font-medium uppercase text-${genreColor}-600">Författare: ${book.bookAuthor}</p>
                  </div>
                  <div class="space-x-1 flex text-sm font-medium">
                    <p class="text-xs leading-6 font-medium uppercase text-${genreColor}-600">Genre: ${book.bookGenre}</p>
                  </div>
                </div>
                <div class="flex space-x-4 mb-5 text-sm font-medium">
                  <div class="flex-auto flex space-x-4 pr-4">
                    <button onclick="setCurrentBook(${book.id})" class="flex-none w-1/2 h-12 uppercase font-medium tracking-wider bg-${genreColor}-900 text-white" type="submit">
                      Ändra
                    </button>
                    <button  onclick="deleteBook(${book.id})" class="flex-none w-1/2 h-12 uppercase font-medium tracking-wider border border-${genreColor}-200 text-${genreColor}-900" type="button">
                      Ta Bort
                    </button>
                  </div>
                </div>
            </li>`;
          });
        html += `</ul>`;

        bookListElement.innerHTML = html;
      } else {
        bookListElement.innerHTML = 'No books available';
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

const selectElement = document.getElementById('bookGenre');

selectElement.addEventListener('change', function(event) {
    if (event.target.value === 'Ex. Romance') {
        formElement.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Romance genre is not allowed.');
          // You can display an error message or handle the condition as needed
    });
} else {
    formElement.removeEventListener('submit', function(e) {
        e.preventDefault();
    });
    }
});


/*
const selectElement = document.getElementById('selectGenre');
const formElement = document.getElementById('yourFormId');

selectElement.addEventListener('change', function(event) {
    if (selectElement.value === 'Romance') {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Romance genre is not allowed.');
            // You can display an error message or handle the condition as needed
        });
    } else {
        formElement.removeEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
});
*/


function setCurrentBook(id) {
    console.log('current', id);
  
    fetch(`${url}/${id}`)
      .then((result) => result.json())
      .then((book) => {
        console.log(book);
        bookForm.bookTitle.value = book.bookTitle;
        bookForm.bookIsbn.value = book.bookIsbn;
        bookForm.bookAuthor.value = book.bookAuthor;
        bookForm.bookPrice.value = book.bookPrice;
        bookForm.bookGenre.value = book.bookGenre;
  
        localStorage.setItem('currentId', book.id);
      });
}

function deleteBook(id) {
    console.log('delete', id);
    fetch(`${url}/${id}`, { method: 'DELETE' }).then((result) => fetchData());
}

bookForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const serverBookObject = {
      bookTitle: '',
      bookIsbn: '',
      bookAuthor: '',
      bookPrice: '',
      bookGenre: ''
    };
    serverBookObject.bookTitle = bookForm.bookTitle.value;
    serverBookObject.bookIsbn = bookForm.bookIsbn.value;
    serverBookObject.bookAuthor = bookForm.bookAuthor.value;
    serverBookObject.bookPrice = bookForm.bookPrice.value;
    serverBookObject.bookGenre = bookForm.bookGenre.value;
  
    const id = localStorage.getItem('currentId');
    if (id) {
      serverBookObject.id = id;
    }
  
    const request = new Request(url, {
      method: serverBookObject.id ? 'PUT' : 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(serverBookObject)
    });
  
    fetch(request).then((response) => {
      fetchData();
  
      localStorage.removeItem('currentId');
      bookForm.reset();
    });
}