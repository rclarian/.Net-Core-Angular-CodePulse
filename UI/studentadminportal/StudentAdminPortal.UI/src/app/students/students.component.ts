import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Subscription } from 'rxjs';
import { Student } from '../models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit, OnDestroy, AfterViewInit{

  studentSubscription?: Subscription;
  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator?: MatPaginator;

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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator;
  }

  ngOnDestroy(): void {
    this.studentSubscription?.unsubscribe();
  }

}
