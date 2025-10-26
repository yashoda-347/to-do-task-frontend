import React, { useState } from 'react';

function AddTask({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && description.trim() && !isSubmitting) {
      try {
        setIsSubmitting(true);
        setError(null);
        await onAddTask(title.trim(), description.trim());
        setTitle('');
        setDescription('');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      {error && (
        <div className="form-error">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows="3"
          required
          disabled={isSubmitting}
        />
      </div>
      <button 
        type="submit" 
        className="add-button"
        disabled={isSubmitting || !title.trim() || !description.trim()}
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}

export default AddTask;
