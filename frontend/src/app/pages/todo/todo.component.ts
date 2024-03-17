import { Component, OnInit } from '@angular/core';
import {
  ITodoStatus,
  TodoCardComponent,
} from '../../shared/components/todo-card/todo-card.component';
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../core/models/todo.model';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent,
    SlidePanelComponent, ReactiveFormsModule,
    MatButton, MatSidenavContainer,
    MatSidenav, MatSidenavContent,
    MatFormField, MatInput,
    MatLabel, MatError, MatSelect, MatOption],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  todoStatus = ITodoStatus;
  isSlidePanelOpen = false;
  todoId: number | null = null;
  filterByStatus = '';
  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    let userId = Number(localStorage.getItem('userId'));
    this.todoService.getAllTodo(userId, this.filterByStatus).subscribe({
      next: (response) => {
        this.todos = response.data;
      },
    });
  }

  openAddTodoPanel() {
    this.todoForm.reset();
    this.isSlidePanelOpen = true;
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
  }

  onFilterByStatus(status: string) {
    this.filterByStatus = status;
    this.getAllTodos();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.todoId) {
        this.todoService
          .updateTodo(this.todoId, this.todoForm.value)
          .subscribe({
            next: (response) => {
              this.getAllTodos();
              this.onCloseSlidePanel();
            },
          });
      } else {
        this.todoService.addTodo(this.todoForm.value).subscribe({
          next: (response) => {
            this.getAllTodos();
            this.onCloseSlidePanel();
          },
        });
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  onLoadTodoForm(item: ITodo) {
    this.todoId = item.id!!;
    this.todoForm.patchValue({
      title: item.title,
      description: item.description,
      status: item.status,
    });
    this.openSlidePanel();
  }
}
