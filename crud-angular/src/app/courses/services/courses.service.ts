import { Injectable } from '@angular/core';
import { Course } from "../model/course";
import { HttpClient } from "@angular/common/http";
import { delay, first, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly API = 'api/courses'

  public constructor(
    private httpClient: HttpClient
  ) {
  }

  public getList(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        delay(3000),
        tap({
          next: courses => console.log('--- Log do CoursesService:', courses)
        })
      );
  }
}
