import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Gerenciador de Tarefas</h1>

    <form (submit)="addOrUpdateTask()">
      <input [(ngModel)]="task.title" name="title" placeholder="Título" required />
      <input [(ngModel)]="task.description" name="description" placeholder="Descrição" />
      <button type="submit">{{ task.id ? 'Atualizar' : 'Adicionar' }}</button>
      <button *ngIf="task.id" (click)="reset()" type="button">Cancelar</button>
    </form>

    <ul>
      <li *ngFor="let t of tasks">
        <input type="checkbox" [checked]="t.completed" (change)="toggleComplete(t)" />
        <strong [style.textDecoration]="t.completed ? 'line-through' : 'none'">{{ t.title }}</strong> - {{ t.description }}
        <button (click)="editTask(t)">✏️</button>
        <button (click)="deleteTask(t.id)">🗑️</button>
      </li>
    </ul>
  `,
  styles: [`
    ul { list-style: none; padding: 0; }
    li { margin: 8px 0; }
    input[type="text"] { margin-right: 10px; }
    button { margin-left: 5px; }
  `]
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  task: Partial<Task> = { title: '', description: '', completed: false };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  addOrUpdateTask() {
    if (!this.task.title) return;

    if (this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
        this.loadTasks();
        this.reset();
      });
    } else {
      this.taskService.createTask(this.task).subscribe(() => {
        this.loadTasks();
        this.reset();
      });
    }
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  editTask(task: Task) {
    this.task = { ...task };
  }

  toggleComplete(task: Task) {
    this.taskService.updateTask(task.id, { completed: !task.completed }).subscribe(() => this.loadTasks());
  }

  reset() {
    this.task = { title: '', description: '', completed: false };
  }
}
