package com.taskapp.service;

import com.taskapp.dto.TaskRequest;
import com.taskapp.dto.TaskResponse;
import com.taskapp.dto.TaskSummary;
import com.taskapp.entity.Priority;
import com.taskapp.entity.Task;
import com.taskapp.entity.TaskStatus;
import com.taskapp.exception.ResourceNotFoundException;
import com.taskapp.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskResponse createTask(TaskRequest request) {
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .priority(request.getPriority() != null ? request.getPriority() : Priority.MEDIUM)
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.PENDING)
                .build();
        return toResponse(taskRepository.save(task));
    }

    public List<TaskResponse> getAllTasks(TaskStatus status, Priority priority) {
        List<Task> tasks;
        if (status != null && priority != null) {
            tasks = taskRepository.findByStatusAndPriority(status, priority);
        } else if (status != null) {
            tasks = taskRepository.findByStatus(status);
        } else if (priority != null) {
            tasks = taskRepository.findByPriority(priority);
        } else {
            tasks = taskRepository.findAll();
        }
        return tasks.stream().map(this::toResponse).toList();
    }

    public TaskResponse getTaskById(Long id) {
        Task task = findTaskOrThrow(id);
        return toResponse(task);
    }

    public TaskResponse updateTask(Long id, TaskRequest request) {
        Task task = findTaskOrThrow(id);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        if (request.getPriority() != null) {
            task.setPriority(request.getPriority());
        }
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }
        return toResponse(taskRepository.save(task));
    }

    public TaskResponse updateStatus(Long id, TaskStatus status) {
        Task task = findTaskOrThrow(id);
        task.setStatus(status);
        return toResponse(taskRepository.save(task));
    }

    public void deleteTask(Long id) {
        Task task = findTaskOrThrow(id);
        taskRepository.delete(task);
    }

    public List<TaskResponse> searchByTitle(String title) {
        return taskRepository.findByTitleContainingIgnoreCase(title)
                .stream().map(this::toResponse).toList();
    }

    public TaskSummary getSummary() {
        List<Task> allTasks = taskRepository.findAll();
        long total = allTasks.size();
        long pending = allTasks.stream().filter(t -> t.getStatus() == TaskStatus.PENDING).count();
        long completed = allTasks.stream().filter(t -> t.getStatus() == TaskStatus.COMPLETED).count();
        long high = allTasks.stream().filter(t -> t.getPriority() == Priority.HIGH).count();
        long medium = allTasks.stream().filter(t -> t.getPriority() == Priority.MEDIUM).count();
        long low = allTasks.stream().filter(t -> t.getPriority() == Priority.LOW).count();
        long overdue = allTasks.stream()
                .filter(t -> t.getStatus() == TaskStatus.PENDING)
                .filter(t -> t.getDueDate() != null && t.getDueDate().isBefore(LocalDate.now()))
                .count();

        return TaskSummary.builder()
                .totalTasks(total)
                .pendingTasks(pending)
                .completedTasks(completed)
                .highPriorityTasks(high)
                .mediumPriorityTasks(medium)
                .lowPriorityTasks(low)
                .overdueTasks(overdue)
                .build();
    }

    private Task findTaskOrThrow(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
    }

    private TaskResponse toResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .dueDate(task.getDueDate())
                .priority(task.getPriority())
                .status(task.getStatus())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
