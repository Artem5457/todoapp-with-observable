import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo1, userId } from './interface';
// import { Todo } from './interface';
// import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo1[] >([]);

  constructor(
    private http: HttpClient
  ) { }

  addTodo(inputValue: string): void {
    // this.http.post<Todo1>('https://mate.academy/students-api/todos', {
    //   userId: userId,
    //   title: inputValue,
    //   completed: false
    // })
  }

  deleteTodo(todo): void {
    // this.todos$.next(this.todos$.value.filter(item => todo.id !== item.id));

    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  changeStatus(todo): void {

    // this.todos$.next(this.todos$.value.map(item => {
    //   if (item.id === todo.id) {
    //     return {
    //       ...item,
    //       completed: !item.completed
    //     }
    //   }

    //   return item;
    // }));

    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  changeTitle(todo) {
    // this.todos$.next(this.todos$.value.map(item => {
    //   if (item.id === todo.id) {
    //     return {
    //       ...todo
    //     }
    //   }

    //   return item;
    // }));

    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  completedRemove() {
    // this.todos$.next(this.todos$.value.filter(item => !item.completed));
    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  updateTodos(allTodosStatus: boolean) {
    // this.todos$.next(this.todos$.value.map(item => {
    //   return {
    //     ...item,
    //     completed: allTodosStatus
    //   }
    // }));

    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }
}
