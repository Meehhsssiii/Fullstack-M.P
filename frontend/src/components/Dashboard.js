import React from 'react';

function StatCard({ label, value, color }) {
  return (
    <div style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
      <div style={styles.value}>{value}</div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}

export default function Dashboard({ summary }) {
  if (!summary) return null;

  return (
    <div style={styles.grid}>
      <StatCard label="Total Tasks" value={summary.totalTasks} color="#4c6ef5" />
      <StatCard label="Pending" value={summary.pendingTasks} color="#f59f00" />
      <StatCard label="Completed" value={summary.completedTasks} color="#37b24d" />
      <StatCard label="High Priority" value={summary.highPriorityTasks} color="#e03131" />
      <StatCard label="Overdue" value={summary.overdueTasks} color="#9c36b5" />
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '12px',
    marginBottom: '24px',
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  value: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#212529',
  },
  label: {
    fontSize: '13px',
    color: '#868e96',
    marginTop: '4px',
  },
};
