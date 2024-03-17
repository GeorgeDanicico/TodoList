import { Component, Input } from '@angular/core';
import { ITodo } from '../../../core/models/todo.model';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";

export type ITodoType = 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE';
export const ITodoStatus = ['OPEN', 'PROGRESS', 'TESTING', 'DONE'];

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() type: ITodoType = 'OPEN';
  @Input() todo!: ITodo;


}
