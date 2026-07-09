import React, { useCallback, useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import * as taskApi from './api/taskApi';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      let res;
      if (searchTerm.trim()) {
        res = await taskApi.searchTasks(searchTerm.trim());
      } else {
        res = await taskApi.getTasks(statusFilter || undefined, priorityFilter || undefined);
      }
      setTasks(res.data);
    } catch (err) {
      setErrorMsg('Could not load tasks. Is the backend running on port 8080?');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, searchTerm]);

  const loadSummary = useCallback(async () => {
    try {
      const res = await taskApi.getSummary();
      setSummary(res.data);
    } catch (err) {
      // Summary failures are non-critical; ignore silently
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    loadSummary();
  }, [loadSummary, tasks]);

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        await taskApi.updateTask(editingTask.id, formData);
        setEditingTask(null);
      } else {
        await taskApi.createTask(formData);
      }
      loadTasks();
    } catch (err) {
      setErrorMsg('Failed to save task. Please check the form and try again.');
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    try {
      await taskApi.updateTaskStatus(task.id, newStatus);
      loadTasks();
    } catch (err) {
      setErrorMsg('Failed to update task status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await taskApi.deleteTask(id);
      loadTasks();
    } catch (err) {
      setErrorMsg('Failed to delete task.');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📋 Task Manager</h1>

        <Dashboard summary={summary} />

        <TaskForm
          onSubmit={handleAddOrUpdate}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <FilterBar
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          searchTerm={searchTerm}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onSearchChange={setSearchTerm}
        />

        {errorMsg && <div style={styles.errorBanner}>{errorMsg}</div>}

        {loading ? (
          <p style={styles.loading}>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '32px 16px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '26px',
    marginBottom: '20px',
    color: '#212529',
  },
  loading: {
    textAlign: 'center',
    color: '#868e96',
  },
  errorBanner: {
    background: '#fff5f5',
    color: '#e03131',
    padding: '10px 14px',
    borderRadius: '6px',
    marginBottom: '14px',
    fontSize: '14px',
  },
};
