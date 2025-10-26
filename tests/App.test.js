import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

// Mock the useTasks hook
jest.mock('../src/hooks/useTasks', () => ({
  useTasks: () => ({
    visibleTasks: [
      {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        createdAt: '2024-01-15T10:00:00Z'
      }
    ],
    loading: false,
    error: null,
    addTask: jest.fn(),
    markTaskCompleted: jest.fn(),
    refetchTasks: jest.fn()
  })
}));

describe('App', () => {
  test('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
  });

  test('renders the add task form', () => {
    render(<App />);
    expect(screen.getByText('Add a Task')).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  test('displays tasks when available', () => {
    render(<App />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
