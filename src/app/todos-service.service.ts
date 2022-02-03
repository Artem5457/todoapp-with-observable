import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo1, userId } from './interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private http: HttpClient
  ) { }

  addTodo(newTodo: Todo1): Observable<Todo1> {
    return this.http.post<Todo1>('https://mate.academy/students-api/todos', newTodo)
  }

  getTodos(): Observable<Todo1[]> {
    return this.http.get<Todo1[]>(`https://mate.academy/students-api/todos?userId=${userId}`);
  }

  removeTodo(id: number): Observable<number> {
    return this.http.delete<number>(`https://mate.academy/students-api/todos/${id}`);
  }

  patchTodo(todoId: number, patchedProps: {  completed?: boolean, title?: string}): Observable<Todo1> {
    return this.http.patch<Todo1>(`https://mate.academy/students-api/todos/${todoId}`, patchedProps);
  }
}
