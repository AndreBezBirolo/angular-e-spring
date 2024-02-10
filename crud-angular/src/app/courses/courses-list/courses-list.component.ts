import { Component, Input, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() public courses: Course[] = [];
  public readonly displayedColumns: string[] = ['name', 'category', 'actions'];


  constructor(private router: Router, private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit(): void {
  }


  public onAdd(): void {
    console.log('--- onAdd');
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

}
