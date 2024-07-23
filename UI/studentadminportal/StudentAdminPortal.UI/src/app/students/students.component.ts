import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, OnDestroy{

  studentSubscription?: Subscription;

  constructor(private studentService: StudentService) {

  }
  
  ngOnInit(): void {
    //Fetch students
    this.studentSubscription = this.studentService.getStudents()
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log('Error on getStudents' + err);
        }
      });
  }

  ngOnDestroy(): void {
    this.studentSubscription?.unsubscribe();
  }

}
