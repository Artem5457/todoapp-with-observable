import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo1 } from '../interface';
import {completeTodo, removeTodo} from '../reducers/todos';
import { TodosService } from '../todos-service.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo1;

  editMode: boolean = false;
  editTitle: string = this.todo === undefined ? '' : this.todo.title;

  constructor(
    private http: HttpClient,
    private todosService: TodosService,
    private store: Store
  ) { }

  ngOnInit(): void {

  }

  changeMode() {
    this.editMode = true;
  }

  removeItem() {
    this.store.dispatch(removeTodo(this.todo));
  }

  onKeyUp(event: KeyboardEvent) {
    if (this.editTitle.length > 0 && event.keyCode === 13) {
      this.http.patch<Todo1>(`https://mate.academy/students-api/todos/${this.todo.id}`, {
        title: this.editTitle
      }).subscribe(todo => {
        this.todosService.todos$.next(this.todosService.todos$.value.map((item => {
          if (item.id === todo.id) {
            return {
              ...item,
              title: this.editTitle
            }
          }

          return item;
        })))
      });

      this.editMode = false;
    } else if (event.keyCode === 27) {
      this.editMode = false;
    }
  }

  completeChange() {

    this.store.dispatch(completeTodo(this.todo));

  }
}
