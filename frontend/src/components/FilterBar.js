import React from 'react';

export default function FilterBar({
  statusFilter,
  priorityFilter,
  searchTerm,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
}) {
  return (
    <div style={styles.bar}>
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={styles.search}
      />

      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)} style={styles.select}>
        <option value="">All Statuses</option>
        <option value="PENDING">Pending</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <select value={priorityFilter} onChange={(e) => onPriorityChange(e.target.value)} style={styles.select}>
        <option value="">All Priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
    </div>
  );
}

const styles = {
  bar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  search: {
    flex: 2,
    minWidth: '200px',
    padding: '8px 10px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '14px',
  },
  select: {
    flex: 1,
    minWidth: '140px',
    padding: '8px 10px',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '14px',
  },
};
