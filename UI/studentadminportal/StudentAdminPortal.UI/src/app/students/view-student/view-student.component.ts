import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from '../../models/ui-models/student.model';
import { GenderService } from '../../services/gender.service';
import { Gender } from '../../models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent implements OnInit, OnDestroy {

  paramsSubscription?: Subscription = new Subscription();
  studentSubscription?: Subscription = new Subscription();
  genderSubscription?: Subscription = new Subscription();
  updateStudentSubscription?: Subscription = new Subscription();
  deleteStudentSubscription?: Subscription = new Subscription();
  addStudentSubscription?: Subscription = new Subscription();
  studentId?: string | null;
  genderList: Gender[] = [];
  isNewStudent: boolean = false;
  header: string = '';
  displayProfileImageUrl: string = '';

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }

  constructor(
    private studentService: StudentService, 
    private readonly route: ActivatedRoute, 
    private genderService: GenderService,
    private router: Router,
    private snackbar: MatSnackBar){}
  
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap
    .subscribe({
      next: (params) => {
        this.studentId = params.get('id');

        if(this.studentId){
          if(this.studentId.toLocaleLowerCase() === 'Add'.toLocaleLowerCase()){
            // -> new Student Functionality
            this.isNewStudent = true;
            this.header = 'Add New Student';
            this.setImage();
          }else{
            // -> Existing Student Functionality
            this.isNewStudent = false;
            this.header = 'Edit Student';
            this.studentSubscription = this.studentService.getStudent(this.studentId)
            .subscribe({
              next: (res) => {
                this.student = res;
                this.setImage();
              },
              error: (err) => {
                console.log('Error on getStudent' + err);
                this.setImage();
              }
            });
          }

          this.genderSubscription = this.genderService.getGenderList()
              .subscribe({
                next: (res) => {
                  this.genderList = res;
                },
                error: (err) => {
                  console.log('Error on getGenderList' + err);
                }
              });
        }
      },
      error: (err) => {
        console.log('Error on paramMap' + err);
      }
    });
  }

  onAdd(): void{
    this.addStudentSubscription = this.studentService.addStudent(this.student)
      .subscribe({
        next: (res) => {
          this.snackbar.open('Student Added successfull', undefined, {
            duration: 2000
          });

          setTimeout(() => {
            this.router?.navigateByUrl(`/students/${res.id}`);
          }, 2000);
        },
        error: (err) => {
          console.log('Error on addStudent' + err);
        }
      });
  }

  onUpdate(): void{
    this.updateStudentSubscription = this.studentService.updateStudent(this.studentId, this.student)
      .subscribe({
        next: (res) => {
          this.snackbar.open('Student updated successfull', undefined, {
            duration: 2000
          });

          setTimeout(() => {
            this.router?.navigateByUrl('/students');
          }, 2000);
          
        },
        error: (err) => {
          console.log('Error on updateStudent' + err);
        }
      });
  }

  onDelete(){
    if(confirm('Are you sure to Delete the student?')){
      this.deleteStudentSubscription = this.studentService.deleteStudent(this.studentId)
      .subscribe({
        next: (res) => {
          this.snackbar.open('Student DELETED successfull', undefined, {
            duration: 2000
          });

          setTimeout(() => {
            this.router?.navigateByUrl('/students');
          }, 2000);
          
        },
        error: (err) => {
          console.log('Error on deleteStudent' + err);
        }
      })
    }
  }

  private setImage(): void{
    if(this.student.profileImageUrl){
      // Fetch the image by url
      this.displayProfileImageUrl = '/assets/user.png';
    }else{
      // Display a default
      this.displayProfileImageUrl = '/assets/user.png';
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.studentSubscription?.unsubscribe();
    this.genderSubscription?.unsubscribe();
    this.updateStudentSubscription?.unsubscribe();
    this.deleteStudentSubscription?.unsubscribe();
    this.addStudentSubscription?.unsubscribe();
  }


}
