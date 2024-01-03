const url = 'http://localhost:3000/books';

window.addEventListener('load', fetchData);

function fetchData() {
    fetch(url)
      .then((result) => result.json())
      .then((books) => {
        if (books.length > 0) {
          let html = `<ul id="bookList" class="flex-auto bg-${book.bookGenre}-100 border-${book.bookGenre}-300 border-2 p-6">`;
          books.forEach((book) => {
            html += `
            <li id="${book.id}">
                <div class="flex flex-wrap items-baseline">
                  <h1 class="w-full flex-none mb-3 text-2xl leading-none text-${book.bookGenre}-900">
                      ${book.bookTitle}
                  </h1>
                  <div class="flex-auto text-lg font-medium text-${book.bookGenre}-600">
                      ${book.bookPrice}
                  </div>
                  <div class="text-xs leading-6 font-medium uppercase text-${book.bookGenre}-600">
                      ISBN: ${book.bookIsbn}
                  </div>
                </div>
                <div class="flex grid grid-cols-1 items-baseline mt-4 mb-6 pb-6 border-b border-${book.bookGenre}-400">
                  <div class="space-x-1 flex text-sm font-medium">
                    <p class="text-xs leading-6 font-medium uppercase text-${book.bookGenre}-600">Författare: ${book.bookAuthor}</p>
                  </div>
                  <div class="space-x-1 flex text-sm font-medium">
                    <p class="text-xs leading-6 font-medium uppercase text-${book.bookGenre}-600">Genre: ${book.bookGenre}</p>
                  </div>
                </div>
                <div class="flex space-x-4 mb-5 text-sm font-medium">
                  <div class="flex-auto flex space-x-4 pr-4">
                    <button onclick="setCurrentbook(${book.id})" class="flex-none w-1/2 h-12 uppercase font-medium tracking-wider bg-${book.bookGenre}-900 text-white" type="submit">
                      Ändra
                    </button>
                    <button  onclick="deletebook(${book.id})" class="flex-none w-1/2 h-12 uppercase font-medium tracking-wider border border-${book.bookGenre}-200 text-${book.bookGenre}-900" type="button">
                      Ta Bort
                    </button>
                  </div>
                </div>
            </li>

            
            `;
        });
        html += `</ul>`;

        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';
        bookList.insertAdjacentHTML('beforeend', html);
      }
    });
}

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

      res.send(response);
    });
}