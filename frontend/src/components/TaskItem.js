import React from 'react';

const PRIORITY_COLORS = {
  LOW: '#37b24d',
  MEDIUM: '#f59f00',
  HIGH: '#e03131',
};

function isOverdue(task) {
  if (!task.dueDate || task.status === 'COMPLETED') return false;
  return new Date(task.dueDate) < new Date(new Date().toDateString());
}

export default function TaskItem({ task, onToggleStatus, onEdit, onDelete }) {
  const overdue = isOverdue(task);

  return (
    <div style={{ ...styles.item, opacity: task.status === 'COMPLETED' ? 0.65 : 1 }}>
      <input
        type="checkbox"
        checked={task.status === 'COMPLETED'}
        onChange={() => onToggleStatus(task)}
        style={styles.checkbox}
      />

      <div style={styles.content}>
        <div style={styles.titleRow}>
          <span
            style={{
              ...styles.title,
              textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </span>
          <span style={{ ...styles.badge, background: PRIORITY_COLORS[task.priority] }}>
            {task.priority}
          </span>
          {overdue && <span style={styles.overdueBadge}>OVERDUE</span>}
        </div>

        {task.description && <p style={styles.description}>{task.description}</p>}

        {task.dueDate && <span style={styles.dueDate}>Due: {task.dueDate}</span>}
      </div>

      <div style={styles.actions}>
        <button onClick={() => onEdit(task)} style={styles.editBtn}>
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} style={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    background: '#fff',
    padding: '14px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    marginBottom: '10px',
  },
  checkbox: { marginTop: '4px', width: '18px', height: '18px', cursor: 'pointer' },
  content: { flex: 1 },
  titleRow: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' },
  title: { fontSize: '15px', fontWeight: 600, color: '#212529' },
  badge: {
    color: '#fff',
    fontSize: '11px',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '10px',
  },
  overdueBadge: {
    background: '#212529',
    color: '#fff',
    fontSize: '11px',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '10px',
  },
  description: { fontSize: '13px', color: '#495057', margin: '6px 0' },
  dueDate: { fontSize: '12px', color: '#868e96' },
  actions: { display: 'flex', gap: '8px' },
  editBtn: {
    background: '#e7f5ff',
    color: '#1971c2',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
  deleteBtn: {
    background: '#fff5f5',
    color: '#e03131',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};
