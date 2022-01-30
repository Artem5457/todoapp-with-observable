import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListComponent {
  @Output() sendToggleAllStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  allTodosStatus: boolean = false;

  constructor() { }

  toggleAllTodos() {
    this.allTodosStatus = !this.allTodosStatus;

    this.sendToggleAllStatus.emit(this.allTodosStatus);
  }
}
