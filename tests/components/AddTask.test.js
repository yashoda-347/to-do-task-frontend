import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from '../../src/components/AddTask';

describe('AddTask', () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  test('renders form elements', () => {
    render(<AddTask onAddTask={mockOnAddTask} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  test('calls onAddTask when form is submitted with valid data', () => {
    render(<AddTask onAddTask={mockOnAddTask} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.click(addButton);

    expect(mockOnAddTask).toHaveBeenCalledWith('New Task', 'New Description');
  });

  test('button is disabled when inputs are empty', () => {
    render(<AddTask onAddTask={mockOnAddTask} />);
    
    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeDisabled();
  });
});
