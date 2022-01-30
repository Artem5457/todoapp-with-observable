import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BehaviorSubject, Observable, tap, map, combineLatest, filter} from 'rxjs';
import {Todo, Todo1, userId} from './interface';
import { TodosService } from './todos-service.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  visibleTodos: Todo1[];
  // notCompletedTodos$!: Observable<Todo1[]>;
  buttonStatus: boolean = false;
  filter$ = new BehaviorSubject<string>('all');

  constructor(
    private todosService: TodosService,
    private http: HttpClient
  ) {
    this.filter$.next('all');
  }

  ngOnInit(): void {
    this.http.get<Todo1[]>('https://mate.academy/students-api/todos')
      .subscribe((todos) => {
      this.visibleTodos = todos.filter(todo => todo.userId === userId);
      console.log('Todos: ', this.visibleTodos);
    })
  }

  onFilterChange(value: string) {
    this.filter$.next(value);
  }

  addTodo(newTodo: Todo) {
    // this.todosService.addTodo(newTodo);
    // this.http.post<Todo>('https://mate.academy/students-api/todos', newTodo).subscribe(res => {
    //  this.visibleTodos = [...this.visibleTodos, res];
    //  console.log('Res: ', res);
    // })
  }

  updateTodos(allTodosStatus: boolean) {
    this.todosService.updateTodos(allTodosStatus);
  }

  completedRemove() {
    this.todosService.completedRemove();
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo);
  }

  changeStatus(todo: Todo) {
    this.todosService.changeStatus(todo);
  }

  changeTitle(todo: Todo) {
    this.todosService.changeTitle(todo);
  }
}
