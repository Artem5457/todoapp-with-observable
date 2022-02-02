import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { Todo1 } from '../interface';
import { TodosService } from '../todos-service.service';
import { forkJoin } from "rxjs";
import { Store } from '@ngrx/store';
import { completeAllTodos } from '../reducers/todos';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListComponent {
  allTodosStatus: boolean = false;

  constructor(
    private store: Store
  ) { }

  toggleAllTodos() {
    this.allTodosStatus = !this.allTodosStatus;

    this.store.dispatch(completeAllTodos({payload: this.allTodosStatus}));
  }
}
