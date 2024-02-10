import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";
import { catchError, Observable, of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../../shared/components/error-dialog/error-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  public coursesList$: Observable<Course[]>;

  public constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

  public onAdd(): void {
    console.log('--- onAdd');
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  private openErrorMsg(errorMsg: string) {
    this.matDialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

}
