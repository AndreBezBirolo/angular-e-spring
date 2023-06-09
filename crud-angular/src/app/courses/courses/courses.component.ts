import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import { catchError, Observable, of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../../shared/components/error-dialog/error-dialog.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  public coursesList$: Observable<Course[]>;
  public displayedColumns: string[] = ['name', 'category'];

  public constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog
  ) {
    this.coursesList$ = this.coursesService.getList()
      .pipe(
        catchError((error) => {
          this.openErrorMsg('Erro ao carregar cursos.')
          return of([]);
        })
      );
  }

  public ngOnInit(): void {
  }

  private openErrorMsg(errorMsg: string) {
    this.matDialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

}
