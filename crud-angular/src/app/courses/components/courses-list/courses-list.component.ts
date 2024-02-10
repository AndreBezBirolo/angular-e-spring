import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from "../../model/course";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() public courses: Course[] = [];
  @Output() public add = new EventEmitter(false);
  @Output() public edit: EventEmitter<Course> = new EventEmitter(false);
  @Output() public delete = new EventEmitter(false);
  public readonly displayedColumns: string[] = ['name', 'category', 'actions'];


  constructor() {
  }

  ngOnInit(): void {
  }


  public onAdd(): void {
    console.log('--- onAdd');
    this.add.emit(true);
  }

  public onEdit(course: Course): void {
    this.edit.emit(course);
  }

  public onDelete(course: Course): void {
    this.delete.emit(true);
  }
}
