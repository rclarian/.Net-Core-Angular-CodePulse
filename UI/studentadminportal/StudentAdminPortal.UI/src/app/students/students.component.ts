import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Subscription } from 'rxjs';
import { Student } from '../models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, OnDestroy{

  studentSubscription?: Subscription;
  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  constructor(private studentService: StudentService) {

  }
  
  ngOnInit(): void {
    //Fetch students
    this.studentSubscription = this.studentService.getStudents()
      .subscribe({
        next: (res) => {
          this.students = res;
          this.dataSource = new MatTableDataSource<Student>(this.students);
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
