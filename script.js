function removeTodoFromMemory(todo) {
	var todoList = localStorage.getItem('todo-list');
}

function saveTodosToMemory(todoList) {
	localStorage.setItem('todos-list', todoList);
}

function getTodosFromMemory() {
	var todoList = localStorage.getItem('todos-list');
	if (todoList) {
		return JSON.parse(todoList);
	} else {
		return [];
	}
}

window.onload = function () {
	var todosList = getTodosFromMemory();
	todosList.forEach((todo) => {
		renderTodoOnPage(todo);
	});
};

function addTodo() {
	var todo = getTodoFromInput();
	renderTodoOnPage(todo);

	// handling Local Storage
	const todoListInMemory = getTodosFromMemory();
	todoListInMemory.push(todo);
	saveTodosToMemory(JSON.stringify(todoListInMemory));
}

function getTodoFromInput() {
	const id = Date.now();
	const title = document.getElementById('title').value;
	const description = document.getElementById('description').value;
	return { id, title, description };
}

function deleteTodo(event) {
	var btn = event.target;
	var todoItem = btn.parentNode;
	const todoList = document.getElementById('todo-list');
	todoList.removeChild(todoItem);

	//handling local storage
	const todoListInMemory = getTodosFromMemory();
	const id = todoItem.getAttribute('id');
	const updatedTodoList = todoListInMemory.filter((todo) => todo.id != id);
	saveTodosToMemory(JSON.stringify(updatedTodoList));
}

function renderTodoOnPage(todo) {
	const todoList = document.getElementById('todo-list');
	const todoItem = document.createElement('li');
	todoItem.setAttribute('id', todo.id);
	todoItem.setAttribute('class', 'todo');
	todoItem.innerHTML = `
		<h3>${todo.title}</h3>
		<p>${todo.description}</p>
		<button onclick="deleteTodo(event)">Delete</button>
	`;
	todoList.appendChild(todoItem);
}
