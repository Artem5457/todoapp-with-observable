import { Component } from '@angular/core';
import {Todo1, userId} from '../interface';
import {HttpClient} from "@angular/common/http";
import {TodosService} from "../todos-service.service";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  inputValue: string = '';

  constructor(
    private http: HttpClient,
    private todos: TodosService
  ) { }

  onSubmit(): void {
    if (this.inputValue.length > 0) {

      this.http.post<Todo1>('https://mate.academy/students-api/todos', {
        userId: userId,
        title: this.inputValue,
        completed: false
      }).subscribe(todo => {
        this.todos.todos$.next([
          todo,
          ...this.todos.todos$.value
        ]);
      })

      this.inputValue = '';
    }
  }
}
