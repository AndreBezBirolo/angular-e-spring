import { Injectable } from '@angular/core';
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { first, Observable } from "rxjs";
import { CoursePage } from "../model/course-page";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = 'api/courses'

  public constructor(
    private httpClient: HttpClient
  ) {
  }

  public getList(pageNr = 0, pageSize = 10): Observable<CoursePage> {
    return this.httpClient.get<CoursePage>(this.API, {params: {pageNr, pageSize}})
      .pipe(
        first(),
      );
  }

  public getById(id: string): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`)
  }

  public save(course: Partial<Course>): Observable<Course> {
    if (course._id) {
      return this.update(course);
    } else {
      return this.create(course)
    }
  }

  public remove(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.API}/${id}`)
      .pipe(first());
  }

  private create(course: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, course)
      .pipe(first());
  }

  private update(course: Partial<Course>): Observable<Course> {
    return this.httpClient.put<Course>(`${this.API}/${course._id}`, course)
      .pipe(first());
  }
}
