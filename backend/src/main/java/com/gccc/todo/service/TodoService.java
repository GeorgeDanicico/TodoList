package com.gccc.todo.service;

import com.gccc.todo.controller.TodoController;
import com.gccc.todo.exception.AppException;
import com.gccc.todo.model.Todo;
import com.gccc.todo.model.User;
import com.gccc.todo.repository.TodoRepository;
import com.gccc.todo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoService(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }

    public List<Todo> getAllTodos(String status, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException("User not found"));

        List<Todo> all = todoRepository.findAll();

        if (status.equals("all")) {
            return todoRepository.findAllByUser(user);
        }

        return todoRepository.findAllByUserAndStatus(user, status);
    }

    public void addTodo(TodoController.TodoRequest addTodoRequest) {
        User user = userRepository.findById(addTodoRequest.userId()).orElseThrow(() -> new AppException("User not found"));
        Todo todo = Todo.builder()
                .title(addTodoRequest.title())
                .description(addTodoRequest.description())
                .status(addTodoRequest.status())
                .user(user)
                .build();
        todoRepository.save(todo);
    }

    public void updateTodo(Long id, TodoController.TodoRequest updateTodoRequest) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new AppException("Todo not found"));
        todo.setTitle(updateTodoRequest.title());
        todo.setDescription(updateTodoRequest.description());
        todo.setStatus(updateTodoRequest.status());
        todoRepository.save(todo);
    }
}
