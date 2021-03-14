//Selectors 
const output = document.querySelector('#output');
const form = document.querySelector('#todoForm');
const input = document.querySelector('#todoInput');
let todos = [];





//hämtar hem todos från databasen
const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
  .then(res => res.json())
  .then(data => {
    todos = data;
    console.log(todos);
    listTodos();
  })
}
fetchTodos();


const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {
    newTodo(todo);
  })
  
  
}

const newTodo = (todo) => {
      output.innerHTML += 
       `<div class="card p-3 mt-2">
           <h3>${todo.title}</h3>
        </div>`

    } 


 // Skickar våra todos till databasen och får ett svar
const createTodo = (title) => { 
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    
    todos.unshift(data); // skickas till min array (todos)
    listTodos();
  })
}

// När vi klickar så körs Val
form.addEventListener('submit', e => {
  e.preventDefault();
  
  if(validateInput(input)) {
    createTodo(input.value);
  }

  input.value = '';
})


  //Skapar validerings funktion
const validateInput = (input1) => {

if(input1.value.trim() === '') {

  input1.classList.add('is-invalid');
  input1.classList.remove('is-valid');
  return false
} else {
  input1.classList.remove('is-invalid');
  input1.classList.add('is-valid');
  return true
}
}