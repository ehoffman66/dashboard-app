import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip'; // Import Chip from Material-UI
import './Todo.css';

const TodoWidget = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [newCategory, setNewCategory] = useState(''); 
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const taskDate = dueDate ? new Date(dueDate + 'T00:00') : null;
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, date: taskDate, category: newCategory }]);
      setNewTask('');
      setDueDate('');
      setNewCategory('');
    }
  };

  const editTaskDate = (taskId, newDate) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const taskDate = newDate ? new Date(newDate + 'T00:00') : null;
        return { ...task, date: taskDate };
      }
      return task;
    }));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const editTask = (taskId, newText) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      }
      return task;
    }));
    setEditing(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter(task => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);
    if (filter === 'today') {
      return taskDate.getTime() === today.getTime();
    } else if (filter === 'overdue') {
      return task.date && taskDate < today;
    } else {
      return true;
    }
  });

  return (
    <div className="todo-widget">
      <input 
        type="text" 
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add new task"
      />
      <input 
        type="date" 
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input 
        type="text" 
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Add category"
      />
      <button onClick={addTask}>Add</button>
      <div className="filter-chips">
        <Chip label="All" clickable color={filter === 'all' ? 'primary' : 'default'} onClick={() => handleFilterChange('all')} />
        <Chip label="Today" clickable color={filter === 'today' ? 'primary' : 'default'} onClick={() => handleFilterChange('today')} />
        <Chip label="Overdue" clickable color={filter === 'overdue' ? 'primary' : 'default'} onClick={() => handleFilterChange('overdue')} />
      </div>
      <ul>
        {filteredTasks.map(task => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const taskDate = new Date(task.date);
          taskDate.setHours(0, 0, 0, 0);
          const isOverdue = task.date && taskDate < today;

          return (
            <li key={task.id} className="task-item" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              <div className="task-content">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTaskCompletion(task.id)} 
                />
                {editing === task.id ? (
                  <>
                    <input 
                      type="text" 
                      value={task.text}
                      onChange={(e) => editTask(task.id, e.target.value)}
                      autoFocus
                      onFocus={(e) => e.target.select()}
                    />
                    <input 
                      type="date" 
                      value={task.date ? new Date(task.date).toISOString().split('T')[0] : ''}
                      onChange={(e) => editTaskDate(task.id, e.target.value)}
                    />
                    <button onClick={() => setEditing(null)}>Save</button>
                  </>
                ) : (
                  <>
                    <span>{task.text}</span>
                    <button className="edit-button" onClick={() => setEditing(task.id)}>
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </>
                )}
                {task.date && <span className={`task-date ${isOverdue ? 'overdue' : ''}`}>{new Date(task.date).toLocaleDateString()}</span>}
                {task.category && <span className="task-category">{task.category}</span>}
              </div>
              <div className="task-actions">
                <button className="delete-button" onClick={() => deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoWidget;