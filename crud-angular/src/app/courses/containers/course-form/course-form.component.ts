import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../../model/course";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Lesson } from "../../model/lesson";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  public form!: FormGroup;


  constructor(private formBuilder: NonNullableFormBuilder,
              private coursesService: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const course: Course = this.activatedRoute.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, [Validators.required, Validators.maxLength(25)]],
      lessons: this.formBuilder.array(this.getLessons(course))
    });

    console.log(this.form.value)
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

  private getLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach((lesson) => {
        lessons.push(this.createLesson(lesson));
      });
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {_id: '', name: '', youtubeURL: ''}) {
    return this.formBuilder.group({
      _id: [lesson._id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeURL]
    })
  }

  private onSuccess(): void {
    this.snackBar.open('Curso salvo com sucesso!', '', {duration: 5000});
    this.onCancel();
  }

  private onError(): void {
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 5000})
  }
}
