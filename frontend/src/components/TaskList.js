import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleStatus, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p style={styles.empty}>No tasks found. Add one above to get started!</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

const styles = {
  empty: {
    textAlign: 'center',
    color: '#868e96',
    padding: '30px',
    background: '#fff',
    borderRadius: '8px',
  },
};
