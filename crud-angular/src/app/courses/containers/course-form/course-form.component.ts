import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../../model/course";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Lesson } from "../../model/lesson";
import { FormUtilsService } from "../../../shared/form/form-utils.service";
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatHint, MatError, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    standalone: true,
    imports: [MatCard, MatToolbar, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatHint, MatError, MatLabel, MatSelect, MatOption, MatIconButton, MatIcon, MatPrefix, MatCardActions, MatButton]
})
export class CourseFormComponent implements OnInit {

  public form!: FormGroup;


  constructor(private formBuilder: NonNullableFormBuilder,
              private coursesService: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              public formUtils: FormUtilsService) {
  }

  ngOnInit(): void {
    const course: Course = this.activatedRoute.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.getLessons(course), Validators.required)
    });

    console.log(this.form.value)
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.formUtils.validateAllFormFields(this.form);
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

  public getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  public addNewLesson(): void {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  public removeLesson(index: number): void {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
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
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      youtubeURL: [lesson.youtubeURL, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
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
