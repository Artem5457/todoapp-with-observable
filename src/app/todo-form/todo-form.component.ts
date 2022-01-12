import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  inputValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.inputValue.length > 0) {
      const newId = +new Date();
      const newTodo = {
        id: newId,
        title: this.inputValue,
        completed: false
      }

      this.addTodo.emit(newTodo);
    }

    this.inputValue = '';
  }

}
