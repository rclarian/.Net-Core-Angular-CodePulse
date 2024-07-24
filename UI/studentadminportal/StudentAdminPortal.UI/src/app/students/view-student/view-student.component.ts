import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent implements OnInit, OnDestroy {

  paramsSubscription?: Subscription = new Subscription();
  studentSubscription?: Subscription = new Subscription();
  studentId?: string | null;
  constructor(private studentService: StudentService, private readonly route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap
    .subscribe({
      next: (params) => {
        this.studentId = params.get('id');

        if(this.studentId){
          this.studentSubscription = this.studentService.getStudent(this.studentId)
            .subscribe({
              next: (res) => {
                console.log(res)
              },
              error: (err) => {
                console.log('Error on getStudent' + err);
              }
            });
        }

      },
      error: (err) => {
        console.log('Error on paramMap' + err);
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.studentSubscription?.unsubscribe();
  }


}
