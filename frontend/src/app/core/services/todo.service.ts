import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse, ITodo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodo(userId: number, status: string): Observable<IResponse<ITodo[]>> {
    let queryString = '';
    if (status === '') {
      status = 'all';
    }
    queryString = `status=${status}&userId=${userId}`;
    console.log(`${apiEndpoint.TodoEndpoint.getAllTodo}?${queryString}`);
    return this.http.get<IResponse<ITodo[]>>(
      `${apiEndpoint.TodoEndpoint.getAllTodo}?${queryString}`
    );
  }

  addTodo(data: ITodo): Observable<IResponse<ITodo>> {
    data.userId = Number(localStorage.getItem('userId'));
    return this.http.post<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.addTodo}`,
      data
    );
  }

  updateTodo(id: number, data: ITodo): Observable<IResponse<ITodo>> {
    data.userId = Number(localStorage.getItem('userId'));
    return this.http.put<IResponse<ITodo>>(
      `${apiEndpoint.TodoEndpoint.updateTodo}/${id}`,
      data
    );
  }
}
