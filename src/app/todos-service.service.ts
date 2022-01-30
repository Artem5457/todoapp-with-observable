import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './interface';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(
    // private locStorage: LocalStorageService
  ) { }

  addTodo(newTodo: Todo): void {
    this.todos$.next([
      ...this.todos$.value,
      newTodo
    ]);

    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  deleteTodo(todo: Todo): void {
    this.todos$.next(this.todos$.value.filter(item => todo.id !== item.id));

    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  changeStatus(todo: Todo): void {

    this.todos$.next(this.todos$.value.map(item => {
      if (item.id === todo.id) {
        return {
          ...item,
          completed: !item.completed
        }
      }

      return item;
    }));

    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  changeTitle(todo: Todo) {
    this.todos$.next(this.todos$.value.map(item => {
      if (item.id === todo.id) {
        return {
          ...todo
        }
      }

      return item;
    }));

    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  completedRemove() {
    this.todos$.next(this.todos$.value.filter(item => !item.completed));
    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }

  updateTodos(allTodosStatus: boolean) {
    this.todos$.next(this.todos$.value.map(item => {
      return {
        ...item,
        completed: allTodosStatus
      }
    }));

    // this.locStorage.setLocalStorage('todos', this.todos$.value);
  }
}
