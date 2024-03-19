import React, { useState } from 'react';
import './App.css';

function TodoApp() {
  // State variables for managing tasks, input field, filter, and editing
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  // Handler for input field change
  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to start editing a task
  const startEditingTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditingTaskText(taskText);
  };

  // Function to finish editing a task
  const finishEditingTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: editingTaskText } : task
    ));
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  // Function to cancel editing a task
  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  // Filter tasks based on the selected filter option
  const filteredTasks = tasks.filter(task => filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed));

  return (
    <div className="todoapp">
      {/* Header section */}
      <header className="header">
        <h1>Todo App</h1>
        {/* Dropdown menu for filter */}
        <div className="filter-dropdown">
          <button className="filter-button">{filter}</button>
          <div className="filter-content">
            <div onClick={() => setFilter('all')}>All</div>
            <div onClick={() => setFilter('completed')}>Completed</div>
            <div onClick={() => setFilter('incomplete')}>Incomplete</div>
          </div>
        </div>
        {/* Input field for adding new tasks */}
        <input
          className="new-todo"
          placeholder="Tasks to be done?"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(event) => event.key === 'Enter' && addTask()}
        />
      </header>
      {/* Main section containing the task list */}
      <section className="main">
        <ul className="todo-list">
          {/* Render filtered tasks */}
          {filteredTasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div className="view">
                {/* Checkbox to toggle task completion */}
                <input
                  className="toggle"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <div className="todo-item">
                  {/* Label for task text, allowing editing on double-click */}
                  <label
                    onDoubleClick={() => startEditingTask(task.id, task.text)}
                    onBlur={() => finishEditingTask(task.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        finishEditingTask(task.id);
                      } else if (event.key === 'Escape') {
                        cancelEditingTask();
                      }
                    }}
                  >
                    {task.id === editingTaskId ? (
                      <input
                        className="edit"
                        value={editingTaskText}
                        onChange={(event) => setEditingTaskText(event.target.value)}
                        autoFocus
                      />
                    ) : (
                      task.text
                    )}
                  </label>
                  {/* Button to delete the task */}
                  <button className="destroy" onClick={() => deleteTask(task.id)}><span>X</span></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {/* Footer section displaying the count of incomplete tasks */}
      <footer className="footer">
        <span className="todo-count">{tasks.filter(task => !task.completed).length} items left</span>
      </footer>
    </div>
  );
}

export default TodoApp;
