import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from "@angular/forms";
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
    name: [''],
    category: ['']
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
      console.log(course)
      // this.form.patchValue(course)
      this.form.patchValue({
        _id: course._id,
        name: course.name,
        category: course.category
      })
    }
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
