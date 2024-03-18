import React, { useState } from 'react';
import './App.css';

function TodoApp() {
  // State variables
  const [tasks, setTasks] = useState([]); // Array to store tasks
  const [newTask, setNewTask] = useState(''); // Input value for new task
  const [filter, setFilter] = useState('all'); // Filter for tasks (all, completed, incomplete)
  const [editingTaskId, setEditingTaskId] = useState(null); // ID of the task being edited
  const [editingTaskText, setEditingTaskText] = useState(''); // Text of the task being edited

  // Event handlers
  const handleInputChange = (event) => {
    setNewTask(event.target.value); // Update new task input value
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]); // Add new task to tasks array
      setNewTask(''); // Clear new task input
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId)); // Remove task from tasks array
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )); // Toggle completion status of a task
  };

  const startEditingTask = (taskId, taskText) => {
    setEditingTaskId(taskId); // Set the task ID being edited
    setEditingTaskText(taskText); // Set the task text being edited
  };

  const finishEditingTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: editingTaskText } : task
    )); // Update task text
    setEditingTaskId(null); // Clear editing task ID
    setEditingTaskText(''); // Clear editing task text
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null); // Clear editing task ID
    setEditingTaskText(''); // Clear editing task text
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'incomplete' && !task.completed));

  return (
    <div className="todoapp">
      {/* Header */}
      <header className="header">
        <h1>Todo App</h1>
        {/* Input for new task */}
        <input
          className="new-todo"
          placeholder="Tasks to be done?"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(event) => event.key === 'Enter' && addTask()} // Add task on Enter key press
        />
      </header>
      {/* Main section */}
      <section className="main">
        {/* List of tasks */}
        <ul className="todo-list">
          {filteredTasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div className="view">
                {/* Checkbox for task completion */}
                <input
                  className="toggle"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                {/* Task text */}
                <div className="todo-item">
                  <label 
                    onDoubleClick={() => startEditingTask(task.id, task.text)} // Start editing task on double-click
                    onBlur={() => finishEditingTask(task.id)} // Finish editing task on blur
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        finishEditingTask(task.id); // Finish editing task on Enter key press
                      } else if (event.key === 'Escape') {
                        cancelEditingTask(); // Cancel editing task on Escape key press
                      }
                    }}
                  >
                    {task.id === editingTaskId ? (
                      <input
                        className="edit"
                        value={editingTaskText}
                        onChange={(event) => setEditingTaskText(event.target.value)}
                        autoFocus // Auto-focus on input when editing starts
                      />
                    ) : (
                      task.text
                    )}
                  </label>
                  {/* Delete task button */}
                  <button className="destroy" onClick={() => deleteTask(task.id)}><span>X</span></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      {/* Footer */}
      <footer className="footer">
        {/* Display count of incomplete tasks */}
        <span className="todo-count">{tasks.filter(task => !task.completed).length} items left</span>
        {/* Filters for tasks */}
        <ul className="filters">
          {/* All tasks filter */}
          <li>
            <button className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}>All</button>
          </li>
          {/* Completed tasks filter */}
          <li>
            <button className={filter === 'completed' ? 'selected' : ''} onClick={() => setFilter('completed')}>Completed</button>
          </li>
          {/* Incomplete tasks filter */}
          <li>
            <button className={filter === 'incomplete' ? 'selected' : ''} onClick={() => setFilter('incomplete')}>Incomplete</button>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default TodoApp;
