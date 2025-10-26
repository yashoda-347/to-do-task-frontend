import React, { useState } from 'react';

function TaskCard({ task, onMarkCompleted }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDoneClick = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onMarkCompleted(task.id);
    }, 400);
  };

  return (
    <div className={`task-card ${isRemoving ? 'removing' : ''}`}>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
      </div>
      <button 
        className="done-button"
        onClick={handleDoneClick}
        disabled={isRemoving}
      >
        Done
      </button>
    </div>
  );
}

export default TaskCard;
