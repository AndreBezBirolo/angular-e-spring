import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { CoursesComponent } from "./containers/courses/courses.component";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from "@angular/material/legacy-progress-spinner";
import { SharedModule } from "../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
import { CourseFormComponent } from './containers/course-form/course-form.component';
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { CoursesListComponent } from './components/courses-list/courses-list.component';


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

  ]
})
export class CoursesModule {
}
