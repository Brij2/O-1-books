let bookList = [];
let currentUser = null;


// Retrieve data from localStorage, if available
const storedBookList = localStorage.getItem("bookList");
if (storedBookList) {
    bookList = JSON.parse(storedBookList);
    displayBooks();
}

// Retrieve current user from localStorage, if available
const storedCurrentUser = localStorage.getItem("currentUser");
if (storedCurrentUser) {
    currentUser = JSON.parse(storedCurrentUser);
}

if(currentUser === null) {
    showLoginForm();
}
else {
    showBookManagement();
}





 // Show book management
 function showBookManagement() {
    hideLoginForm();
    show();
    displayBooks();
    if (currentUser.role === "user" || currentUser === null) {
        document.getElementById("book-form").style.display = "none";
    }
    else {
        document.getElementById("book-form").style.display = "block";
    }
}

function show(){
  document.getElementById("book-management").style.display = "block";
}

// Hide book management
function hideBookManagement() {
    document.getElementById("book-management").style.display = "none";
}


  // Hide login form
  function hideLoginForm() {
    document.getElementById("login-main").style.display = "none";
  }

  function showLoginForm() {
    hideBookManagement();
    document.getElementById("login-main").style.display = "block";
  }
  




// clear form
function clearForm() {
  document.getElementById("book-name").value = "";
  document.getElementById("rack-number").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("search-term").value = "";
  hideBookList()
}




// add books
    function addBook() {
      const bookName = document.getElementById("book-name").value;
      const rackNumber = document.getElementById("rack-number").value;
      const quantity = document.getElementById("quantity").value;
      if(!validate()) return;
      // Add book to list
      bookList.push({ bookName: bookName, rackNumber: rackNumber, quantity: quantity });
      
      // Save updated bookList to localStorage
      localStorage.setItem("bookList", JSON.stringify(bookList));
      
      clearForm();
      displayBooks();
    }
    // delete books
    function deleteBook(index) {
      // Remove book from list at specified index
      bookList.splice(index, 1);
      
      // Save updated bookList to localStorage
      localStorage.setItem("bookList", JSON.stringify(bookList));
      displayBooks();
    }

    function showBookList() {
      document.getElementById("book-list").style.display = "block";
    }
    function hideBookList() {
      document.getElementById("book-list").style.display = "none";
    }

    //serarch books
    function searchBooks() {
      // Get the keyword entered by the user
      var keyword = document.getElementById("search-term").value;
    
        var book = document.getElementById("book-list");
        keyword === "" ? hideBookList():showBookList();

      // Clear any existing search results
      const tableBody = document.getElementById("book-list").getElementsByTagName("tbody")[0];
      tableBody.innerHTML = "";
      
      // Loop through each book in the book list
      for (var i = 0; i < bookList.length; i++) {
        var book = bookList[i];
    
        if (book.bookName.toLowerCase().includes(keyword.toLowerCase())) { // Check if book name matches search term
          const row = tableBody.insertRow();
          const nameCell = row.insertCell(0);
          const rackCell = row.insertCell(1);
          const quantityCell = row.insertCell(2);
          
          nameCell.innerHTML = book.bookName;
          rackCell.innerHTML = book.rackNumber;
          quantityCell.innerHTML = book.quantity;      
        }
      }
    }
    
  //   function searchBooks() {
  //     // Get the keyword entered by the user
  //     var keyword = document.getElementById("search-term").value;
      
  //     // Get the book list
  //     var book = document.getElementById("book-list");
  //     showBookList();
      
  //     // Clear any existing search results
  //     const tableBody = document.getElementById("book-list").getElementsByTagName("tbody")[0];
  //     tableBody.innerHTML = "";
      
  //     // // Loop through each book in the book list
  //     for (var i = 0; i < bookList.length; i++) {
  //       var books = bookList[i];

  //     if (books.bookName.toLowerCase().includes(keyword)) { // Check if book name matches search term
  //       const row = tableBody.insertRow();
  //       const nameCell = row.insertCell(0);
  //       const rackCell = row.insertCell(1);
  //       const quantityCell = row.insertCell(2);
        
  //       nameCell.innerHTML = book.bookName;
  //       rackCell.innerHTML = book.rackNumber;
  //       quantityCell.innerHTML = book.quantity;      
  //     }
  //   }
  // }
    



    // Update books
function updateBook(index) {
  if(!validate()) return;
  deleteBook(index);
  addBook();
  clearForm();
  displayBooks();
}

function validate() {
  const bookName = document.getElementById("book-name").value;
  const rackNumber = document.getElementById("rack-number").value;
  const quantity = document.getElementById("quantity").value;
  if (bookName === "" || rackNumber === "" || quantity === "") {
    alert("All fields are required");
    return false;
  }
  return true;
}


// display books
function displayBooks() {
    const tableBody = document.getElementById("book-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";
      
      for (let i = 0; i < bookList.length; i++) {
        const book = bookList[i];
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(0);
        const rackCell = row.insertCell(1);
        const quantityCell = row.insertCell(2);
        const deleteCell = row.insertCell(3);
        const updateCell = row.insertCell(4);
        nameCell.innerHTML = book.bookName;
        rackCell.innerHTML = book.rackNumber;
        quantityCell.innerHTML = book.quantity;
        if(currentUser &&  currentUser.role === "admin")
        {
          updateCell.innerHTML = '<button onclick="updateBook(' + i + ')">update</button>';
          deleteCell.innerHTML = '<button onclick="deleteBook(' + i + ')">Delete</button>';
        }
      }
    }
    

// login
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  // Replace with your own user authentication logic
  if (username === "admin" && password === "password") {
    currentUser = { username: username, role: "admin" };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    showBookManagement();
  } else if (username === "user" && password === "password") {
    currentUser = { username: username, role: "user" };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    showBookManagement();
  } else {
    alert("Invalid username or password");
  }
}
// logout 
function logout() {
  console.log("logout");
    currentUser = null;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    showLoginForm();
    hideBookManagement();
  }
  