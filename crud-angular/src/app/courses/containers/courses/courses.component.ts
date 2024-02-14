import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from "../../model/course";
import { CoursesService } from "../../services/courses.service";
import { catchError, Observable, of, tap } from "rxjs";
import { ErrorDialogComponent } from "../../../shared/components/error-dialog/error-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CoursePage } from "../../model/course-page";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { AsyncPipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    standalone: true,
    imports: [MatCard, MatToolbar, CoursesListComponent, MatPaginator, MatProgressSpinner, AsyncPipe]
})

export class CoursesComponent implements OnInit {
  public coursesList$: Observable<CoursePage> | null = null;
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public pageIndex = 0;
  public pageSize = 10;

  public constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  public ngOnInit(): void {
  }

  public onAdd(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  public onEdit(course: Course): void {
    this.router.navigate(['edit', course._id], {relativeTo: this.activatedRoute});

  }

  public onRemove(course: Course): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id)
          .subscribe({
            next: () => {
              this.refresh();
              this.snackBar.open('Curso removido com sucesso!', 'X', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            },
            error: () => this.openErrorMsg('Erro ao tentar remover curso!')
          })
      }
    });
  }

  public refresh(pageEvent: PageEvent = {length: 0, pageIndex: 0, pageSize: 10}): void {
    this.coursesList$ = this.coursesService.getList(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex
          this.pageSize = pageEvent.pageSize;
        }),
        catchError((error) => {
          this.openErrorMsg('Erro ao carregar cursos.')
          return of({courses: [], totalElements: 0, totalPages: 0});
        })
      );
  }

  private openErrorMsg(errorMsg: string) {
    this.matDialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
