import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../../model/course";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  public form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    category: ['', [Validators.required, Validators.maxLength(25)]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
              private coursesService: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const course: Course = this.activatedRoute.snapshot.data['course'];
    if (course) {
      // this.form.patchValue(course)
      this.form.patchValue({
        _id: course._id,
        name: course.name,
        category: course.category
      })
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.coursesService.save(this.form.value)
        .subscribe({
          next: (data) => this.onSuccess(),
          error: (err) => this.onError(),
        });
    }
  }

  public onCancel(): void {
    this.location.back();
  }

  public getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Esse campo é obrigatório.';
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field?.errors ? field.errors['minlength']['requiredLength'] : 5;
      return 'O tamanho mínimo precisa ser de ' + requiredLength + ' caracteres.';
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field?.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return 'O tamanho máximo precisa ser de até ' + requiredLength + ' caracteres.';
    }

    return 'Campo inválido.';
  }

  private onSuccess(): void {
    this.snackBar.open('Curso salvo com sucesso!', '', {duration: 5000});
    this.onCancel();
  }

  private onError(): void {
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 5000})
  }
}
