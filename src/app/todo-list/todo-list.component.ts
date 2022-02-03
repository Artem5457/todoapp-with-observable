import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import { Store } from '@ngrx/store';
import { completeAllTodos } from '../reducers/todos';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListComponent {
  @Output() changeAllTodosStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  allTodosStatus: boolean = false;

  constructor(
    // private store: Store
  ) { }

  toggleAllTodos() {
    this.allTodosStatus = !this.allTodosStatus;

    this.changeAllTodosStatus.emit(this.allTodosStatus);
  }
}
