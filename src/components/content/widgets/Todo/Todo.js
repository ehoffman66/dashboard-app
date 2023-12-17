import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Todo.css';

const TodoWidget = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, date: dueDate ? new Date(dueDate).toISOString() : null }]);
      setNewTask('');
      setDueDate('');
    }
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
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.sort((a, b) => new Date(a.date) - new Date(b.date)).map(task => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <div>
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
              {task.date && <span className="task-date">{new Date(task.date).toLocaleDateString('en-US')}</span>}            </div>
            <button onClick={() => deleteTask(task.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoWidget;