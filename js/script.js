/// Local array to store todo items
let todos = [];

function validateForm(todo, date) {
    if (todo.trim() === '' || date === '') {
        return false;
    }
    return true;
}

/// Function to add a new todo item
function addTodo() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDate = document.getElementById('todo-date').value;

    if (!validateForm(todoInput, todoDate)) {
        alert('Form validation failed. Please check your inputs.');
    } else {
        // Add to local array
        todos.push({ task: todoInput, dueDate: todoDate });

        renderTodos();
    }
}

/// Placeholder function for future feature
function deleteTodo() {
    const todoList = document.getElementById('todo-list');
    const todoItems = todoList.getElementsByTagName('li');

    // Check if there are any todo items
    if (todoItems.length === 0) {
        alert('No todo items available to delete.');
        return;
    }

    // Ask user for the index of the todo to delete
    const index = prompt('Enter the index of the todo item to delete (1-based):');

    // Validate and delete the todo item
    if (index !== null && !isNaN(index) && index >= 1 && index <= todoItems.length) {
        todos.splice(index - 1, 1);
        renderTodos();
    } else {
        alert('Invalid index. Please try again.');
    }
}

function clearTodos() {
    todos = [];
    renderTodos();
}

/// Placeholder functions for future features
function filterTodos() {
    const filterStatus = prompt('Enter status to filter (completed/incomplete):');
    if (filterStatus) {
        const filteredTodos = todos.filter(todo => todo.status === filterStatus);
        renderFilteredTodos(filteredTodos);
    }
}

// Dark mode toggle with localStorage and system preference
const DARK_KEY = 'prefers-dark';
const root = document.documentElement; // or document.body
const btn = document.getElementById('dark-toggle');
const checkbox = document.getElementById('dark-toggle-checkbox');

// Apply theme on load
function applyTheme(isDark) {
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  // update aria / checkbox if present
  if (btn) btn.setAttribute('aria-pressed', String(isDark));
  if (checkbox) checkbox.checked = isDark;
}

// Get saved preference or system default
function getInitialTheme() {
  const saved = localStorage.getItem(DARK_KEY);
  if (saved !== null) return saved === 'true';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Toggle handler
function toggleTheme(next) {
  const isDark = typeof next === 'boolean' ? next : !root.classList.contains('dark');
  applyTheme(isDark);
  localStorage.setItem(DARK_KEY, String(isDark));
}

// Wire buttons
document.addEventListener('DOMContentLoaded', () => {
  // initialize
  applyTheme(getInitialTheme());

  if (btn) {
    btn.addEventListener('click', () => toggleTheme());
  }
  if (checkbox) {
    checkbox.addEventListener('change', (e) => toggleTheme(e.target.checked));
  }

  // Optional: update when system preference changes (if user hasn't explicitly chosen)
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const saved = localStorage.getItem(DARK_KEY);
    if (saved === null) {
      applyTheme(e.matches);
    }
  });
});

/// Function to render todo items to the DOM
function renderTodos() {
    const todoList = document.getElementById('todo-list');

    // Clear existing list
    todoList.innerHTML = '';

    // Render each todo item
    todos.forEach((todo, index) => {
        todoList.innerHTML += `<li>
            <span>${todo.task} - ${todo.dueDate}</span>
        </li>`;
    });
}