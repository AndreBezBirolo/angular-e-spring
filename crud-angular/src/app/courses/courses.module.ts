import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from "./containers/courses/courses.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from "../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";


@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    SharedModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,

  ]
})
export class CoursesModule {
}
