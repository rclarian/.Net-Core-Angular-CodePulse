import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Subscription } from 'rxjs';
import { Student } from '../models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

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

  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  ngOnDestroy(): void {
    this.studentSubscription?.unsubscribe();
  }

}
