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
                    <button  onclick="deleteBook(${book.id})" class="flex-none w-1/2 h-12 uppercase font-medium tracking-wider border border-${genreColor}-200 text-${genreColor}-900" type="button" >
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

function showDialog() {
  let dialog = document.getElementById("dialog");
  dialog.classList.remove("hidden");
  dialog.classList.add("flex");
  setTimeout(() => {
    dialog.classList.add("opacity-100");
  }, 20);
}
function hideDialog() {
  let dialog = document.getElementById("dialog");
  dialog.classList.add("opacity-0");
  dialog.classList.remove("opacity-100");
  setTimeout(() => {
    dialog.classList.add("hidden");
    dialog.classList.remove("flex");
  }, 500);
}

//------------------------------------------------


// Function to show the modal with the provided message
function showModal(message) {
  const modal = document.getElementById('feedbackModal');
  const modalContent = document.getElementById('feedbackContent');
  
  modalContent.innerText = message;
  modal.classList.remove('hidden');
}

// Event listener to hide the modal when 'Close' button is clicked
const closeModalButton = document.getElementById('closeModal');
closeModalButton.addEventListener('click', hideModal);

// JavaScript to handle delete action and show modal response
document.getElementById('deleteButton').addEventListener('click', function() {
  // Display modal to confirm deletion
  showModal('Are you sure you want to delete this book?');

  // Perform delete action after user confirmation
  const confirmed = confirm('Are you sure you want to delete this book?');
  if (confirmed) {
    // Execute delete logic here
    // On success, update modal message
    showModal('Book deleted successfully');
  } else {
    // If not confirmed, hide modal or show cancellation message
    showModal('Deletion cancelled');
  }
});

// Function to hide the modal
function hideModal() {
  const modal = document.getElementById('feedbackModal');
  modal.classList.add('hidden');
}
