import { ITodoType } from '../../shared/components/todo-card/todo-card.component';

export interface IResponse<T> {
  data: T;
  message?: string;
}

export interface ITodo {
  id?: number;
  userId?: number;
  title: string;
  description: string;
  status: ITodoType;
  createdAt?: string;
  updatedAt?: string;
}
