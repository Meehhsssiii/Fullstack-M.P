package com.taskapp.repository;

import com.taskapp.entity.Priority;
import com.taskapp.entity.Task;
import com.taskapp.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByPriority(Priority priority);

    List<Task> findByStatusAndPriority(TaskStatus status, Priority priority);

    List<Task> findByTitleContainingIgnoreCase(String title);
}
