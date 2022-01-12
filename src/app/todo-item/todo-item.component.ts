import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() onRemove: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() onChange: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() onChangeTitle: EventEmitter<Todo> = new EventEmitter<Todo>();
  
  editMode: boolean = false;
  editTitle: string = this.todo === undefined ? '' : this.todo.title;

  constructor() { }

  ngOnInit(): void {

  }

  changeMode() {
    this.editMode = true;
  }

  removeItem() {
    this.onRemove.emit(this.todo);
  }
  
  handleTodoEdit(editTitle: string) {
    this.todo = {
      ...this.todo,
      title: editTitle
    }

    this.onChangeTitle.emit(this.todo);
  }

  onKeyUp(event: KeyboardEvent) {
    if (this.editTitle.length > 0 && event.keyCode === 13) {
      this.handleTodoEdit(this.editTitle);
      this.editMode = false;
    } else if (event.keyCode === 27) {
      this.editMode = false;
    }
  }

  completeChange(todo: Todo) {

    this.onChange.emit(todo);
  }
}
