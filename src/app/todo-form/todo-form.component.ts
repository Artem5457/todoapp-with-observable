import { Component } from '@angular/core';
import {Todo1, userId} from '../interface';
import { Store } from '@ngrx/store';
import { addTodo } from '../reducers/todos';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  inputValue: string = '';

  constructor(
    private store: Store
  ) { }

  onSubmit(): void {
    if (this.inputValue.length > 0) {

      this.store.dispatch(addTodo({
        userId: userId,
        title: this.inputValue,
        completed: false
      }));

      this.inputValue = '';
    }
  }
}
