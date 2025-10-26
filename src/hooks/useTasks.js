import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,  setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getLatestFiveTasks();
      console.log('Fetched tasks:', fetchedTasks);

      if (Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
      } else if (fetchedTasks && Array.isArray(fetchedTasks.data)) {
        setTasks(fetchedTasks.data);
      } else if (fetchedTasks && Array.isArray(fetchedTasks.tasks)) {
        setTasks(fetchedTasks.tasks);
      } else {
        console.warn('Unexpected API response format:', fetchedTasks);
        setTasks([]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (title, description) => {
    try {
      setError(null);
      const newTask = await taskService.createTask({
        title: title.trim(),
        description: description.trim()
      });

      await fetchTasks();
      return newTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchTasks]);

  const markTaskCompleted = useCallback(async (taskId) => {
    try {
      setError(null);
      await taskService.deleteTask(taskId);

      await fetchTasks();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchTasks]);

  const getVisibleTasks = useCallback(() => {
    return tasks;
  }, [tasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    visibleTasks: getVisibleTasks(),
    loading,
    error,
    addTask,
    markTaskCompleted,
    refetchTasks: fetchTasks
  };
};

