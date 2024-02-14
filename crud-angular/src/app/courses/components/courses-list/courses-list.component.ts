import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from "../../model/course";
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    standalone: true,
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIcon, MatMiniFabButton, MatIconButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, CategoryPipe]
})
export class CoursesListComponent implements OnInit {

  @Input() public courses: Course[] = [];
  @Output() public add = new EventEmitter(false);
  @Output() public edit: EventEmitter<Course> = new EventEmitter(false);
  @Output() public remove = new EventEmitter(false);
  public readonly displayedColumns: string[] = ['name', 'category', 'actions'];


  constructor() {
  }

  ngOnInit(): void {
  }


  public onAdd(): void {
    this.add.emit(true);
  }

  public onEdit(course: Course): void {
    this.edit.emit(course);
  }

  public onDelete(course: Course): void {
    this.remove.emit(course);
  }
}
