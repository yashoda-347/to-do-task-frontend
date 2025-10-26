import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from '../../src/components/TaskCard';

describe('TaskCard', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    createdAt: '2024-01-15T10:00:00Z'
  };

  const mockOnMarkCompleted = jest.fn();

  beforeEach(() => {
    mockOnMarkCompleted.mockClear();
  });

  test('renders task information', () => {
    render(<TaskCard task={mockTask} onMarkCompleted={mockOnMarkCompleted} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('calls onMarkCompleted when Done button is clicked', (done) => {
    render(<TaskCard task={mockTask} onMarkCompleted={mockOnMarkCompleted} />);
    
    const doneButton = screen.getByRole('button', { name: /done/i });
    fireEvent.click(doneButton);

    // Wait for the 400ms delay
    setTimeout(() => {
      expect(mockOnMarkCompleted).toHaveBeenCalledWith('1');
      done();
    }, 500);
  });

  test('renders Done button', () => {
    render(<TaskCard task={mockTask} onMarkCompleted={mockOnMarkCompleted} />);
    
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
  });
});
