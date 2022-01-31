import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { Todo1 } from '../interface';
import { TodosService } from '../todos-service.service';
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListComponent {
  allTodosStatus: boolean = false;

  constructor(
    private http: HttpClient,
    private todosService: TodosService
  ) { }

  toggleAllTodos() {
    this.allTodosStatus = !this.allTodosStatus;

    forkJoin(this.todosService.todos$.value.map(item =>
      this.http.patch<Todo1>(`https://mate.academy/students-api/todos/${item.id}`, {
        completed: this.allTodosStatus
      }))).subscribe(data => this.todosService.todos$.next(data));
  }
}
