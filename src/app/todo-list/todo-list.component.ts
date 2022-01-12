import { Component, DoCheck, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Todo } from '../interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListComponent implements DoCheck {
  @Output() sendToggleAllStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  allTodosStatus: boolean = false;

  constructor() { }

  ngDoCheck(): void {
    // console.log('Todo-list: ', this.todos);
  }

  //  Спросить за правильное изменение todos
  toggleAllTodos() {
    this.allTodosStatus = !this.allTodosStatus;
    
    this.sendToggleAllStatus.emit(this.allTodosStatus);
  }
}
