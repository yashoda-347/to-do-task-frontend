// Mock axios before importing taskService
import { taskService } from '../../src/services/taskService';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  }))
}));

describe('taskService',  () => {
  test('has required methods', () => {
    expect(typeof taskService.getLatestFiveTasks).toBe('function');
    expect(typeof taskService.createTask).toBe('function');
    expect(typeof taskService.deleteTask).toBe('function');
  });

  test('getLatestFiveTasks is defined', () => {
    expect(taskService.getLatestFiveTasks).toBeDefined();
  });

  test('createTask is defined', () => {
    expect(taskService.createTask).toBeDefined();
  });

  test('deleteTask is defined', () => {
    expect(taskService.deleteTask).toBeDefined();
  });
});
