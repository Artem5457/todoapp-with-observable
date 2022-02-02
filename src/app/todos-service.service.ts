import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { Todo1, userId } from './interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo1[]>([]);

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
    console.log(id);
    return this.http.delete<number>(`https://mate.academy/students-api/todos/${id}`);
  }

  deleteCompletedTodos(): Observable<Todo1[]> {
    return forkJoin(this.todos$.value.map(item =>
      item.completed ? this.http.delete<any>(`https://mate.academy/students-api/todos/${item.id}`) : of(item)
    ));
  }

  changeStatus(todo: Todo1): Observable<Todo1> {
    return this.http.patch<Todo1>(`https://mate.academy/students-api/todos/${todo.id}`, {
      completed: !todo.completed
    });
  }

  changeTitle(todo: Todo1, editTitle: string): Observable<Todo1> {
    return this.http.patch<Todo1>(`https://mate.academy/students-api/todos/${todo.id}`, {
      title: editTitle
    });
  }

  toggleAllTodos(allTodosStatus: boolean): Observable<Todo1[]>{

    return forkJoin(this.todos$.value.map(item =>
      this.http.patch<Todo1>(`https://mate.academy/students-api/todos/${item.id}`, {
        completed: allTodosStatus
      })));
  }
}
