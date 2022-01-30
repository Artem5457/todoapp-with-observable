import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Todo, Todo1, userId} from '../interface';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  inputValue: string = '';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.inputValue.length > 0) {
      // const newId = +new Date();
      // const newTodo = {
      //   id: newId,
      //   title: this.inputValue,
      //   completed: false
      // }

      this.http.post<Todo1>('https://mate.academy/students-api/todos', {
        title: this.inputValue,
        userId: userId,
        completed: false
      })

      // this.addTodo.emit(newTodo);
    }

    this.inputValue = '';
  }

}
