import { Component, OnInit } from '@angular/core';
import { Course } from "../../model/course";
import { CoursesService } from "../../services/courses.service";
import { catchError, Observable, of } from "rxjs";
import { ErrorDialogComponent } from "../../../shared/components/error-dialog/error-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  public coursesList$: Observable<Course[]> | null = null;

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

  private refresh(): void {
    this.coursesList$ = this.coursesService.getList()
      .pipe(
        catchError((error) => {
          this.openErrorMsg('Erro ao carregar cursos.')
          return of([]);
        })
      );
  }

  private openErrorMsg(errorMsg: string) {
    this.matDialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
