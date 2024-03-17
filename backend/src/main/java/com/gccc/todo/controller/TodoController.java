package com.gccc.todo.controller;

import com.gccc.todo.model.Todo;
import com.gccc.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/todos")
    public ResponseEntity<?> getAllTodos(@RequestParam String status, @RequestParam Long userId) {
        List<Todo> todos = todoService.getAllTodos(status, userId);
        return ResponseEntity.ok(new GetAllTodosResponse("Todos fetched successfully", todos));
    }

    @PostMapping("/todos")
    public ResponseEntity<?> addTodo(@Valid @RequestBody TodoRequest addTodoRequest) {
        todoService.addTodo(addTodoRequest);
        Map<String, String> response = Map.of("message", "Todo added successfully");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/todos/{id}")
    public ResponseEntity<?> updateTodo(@PathVariable Long id, @Valid @RequestBody TodoRequest updateTodoRequest) {
        todoService.updateTodo(id, updateTodoRequest);
        Map<String, String> response = Map.of("message", "Todo added successfully");
        return ResponseEntity.ok(response);
    }

    public record TodoRequest(String title, String description, String status, Long userId,
                                 String createdAt, String updatedAt) { }


    public record GetAllTodosResponse(String message, List<Todo> data) { }
}
