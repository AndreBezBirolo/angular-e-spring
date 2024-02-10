import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { CoursesService } from "../services/courses.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "@angular/common";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  public form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private coursesService: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    })
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    console.log('--- onSubmit');
    this.coursesService.save(this.form.value)
      .subscribe({
        next: (data) => this.onSuccess(),
        error: (err) => this.onError(),
      });
  }

  public onCancel(): void {
    console.log('--- onCancel');
    this.location.back();
  }

  private onSuccess(): void {
    this.snackBar.open('Curso salvo com sucesso!', '', {duration: 5000});
    this.onCancel();
  }

  private onError(): void {
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 5000})
  }
}
