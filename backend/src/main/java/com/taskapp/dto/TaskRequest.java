package com.taskapp.dto;

import com.taskapp.entity.Priority;
import com.taskapp.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title must be under 150 characters")
    private String title;

    @Size(max = 1000, message = "Description must be under 1000 characters")
    private String description;

    private LocalDate dueDate;

    private Priority priority;

    private TaskStatus status;
}
