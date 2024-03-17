package com.gccc.todo.repository;

import com.gccc.todo.model.Todo;
import com.gccc.todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByUser(User user);
    List<Todo> findAllByUserAndStatus(User user, String status);
}
