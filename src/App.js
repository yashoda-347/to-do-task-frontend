import React from 'react';
import './App.css';
import AddTask from './components/AddTask';
import TaskCard from './components/TaskCard';
import { useTasks } from './hooks/useTasks';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const {
    visibleTasks,
    loading,
    error,
    addTask,
    markTaskCompleted
  } = useTasks();

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">✨ Task Master</h1>
      </header>
      
      {error && <ErrorMessage message={error} />}
      
      <div className="todo-container">
        <div className="add-task-section">
          <h2>Add a Task</h2>
          <AddTask onAddTask={addTask} />
        </div>
        <div className="todo-list-section">
          <h2>To-Do List</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="task-list">
              {!visibleTasks || visibleTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <p>No tasks yet. Add one above to get started!</p>
                </div>
              ) : (
                Array.isArray(visibleTasks) && visibleTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onMarkCompleted={markTaskCompleted}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default App;
