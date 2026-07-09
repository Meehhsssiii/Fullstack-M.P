import React, { useEffect, useState } from 'react';

const EMPTY_FORM = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'MEDIUM',
  status: 'PENDING',
};

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        dueDate: editingTask.dueDate || '',
        priority: editingTask.priority || 'MEDIUM',
        status: editingTask.status || 'PENDING',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [editingTask]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (form.title.length > 150) newErrors.title = 'Title must be under 150 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({
      ...form,
      dueDate: form.dueDate || null,
    });
    if (!editingTask) setForm(EMPTY_FORM);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.heading}>{editingTask ? 'Edit Task' : 'Add New Task'}</h3>

      <div style={styles.field}>
        <label style={styles.label}>Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Finish project report"
          style={styles.input}
        />
        {errors.title && <span style={styles.error}>{errors.title}</span>}
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional details..."
          rows={3}
          style={styles.textarea}
        />
      </div>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate || ''}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange} style={styles.input}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} style={styles.input}>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <div style={styles.actions}>
        <button type="submit" style={styles.submitBtn}>
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" onClick={onCancelEdit} style={styles.cancelBtn}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '24px',
  },
  heading: { margin: '0 0 16px 0', fontSize: '18px' },
  field: { marginBottom: '12px', flex: 1 },
  row: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  label: { display: 'block', marginBottom: '4px', fontSize: '13px', fontWeight: 600, color: '#495057' },
  input: {
    width: '100%',
    padding: '8px 10px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '8px 10px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical',
  },
  error: { color: '#e03131', fontSize: '12px', marginTop: '2px', display: 'block' },
  actions: { marginTop: '12px', display: 'flex', gap: '10px' },
  submitBtn: {
    background: '#4c6ef5',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
  },
  cancelBtn: {
    background: '#e9ecef',
    color: '#495057',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
