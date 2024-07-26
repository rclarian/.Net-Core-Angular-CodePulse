import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from '../../models/ui-models/student.model';
import { GenderService } from '../../services/gender.service';
import { Gender } from '../../models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

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
  uploadImageSubscription?: Subscription = new Subscription();

  studentId?: string | null;
  genderList: Gender[] = [];
  isNewStudent: boolean = false;
  header: string = '';
  displayProfileImageUrl: string = '';
  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;

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
                console.log(err);
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
                  console.log(err);
                }
              });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onAdd(): void{
    if(this.studentDetailsForm?.form.valid){
      //Submit data to API
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
          console.log(err);
        }
      });
    }
  }

  onUpdate(): void{
    if(this.studentDetailsForm?.form.valid){
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
          console.log(err);
        }
      });
    }
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
          console.log(err);
        }
      })
    }
  }

  private setImage(): void{
    if(this.student.profileImageUrl){
      // Fetch the image by url
      if(this.student.profileImageUrl === 'profileimage.jpg'){
        this.displayProfileImageUrl = '/assets/user.png';
      }else{
        this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);
      }
    }else{
      // Display a default
      this.displayProfileImageUrl = '/assets/user.png';
    }
  }

  uploadImage(event: Event):void{
    if(this.studentId){
      const inputElement = event.target as HTMLInputElement;

      if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
        console.log('No files selected');
        return;
      }

      const file = inputElement.files[0];

      this.uploadImageSubscription = this.studentService.uploadImage(this.student.id, file)
        .subscribe({
          next: (res) => {
            this.student.profileImageUrl = res;
            this.setImage();

            this.snackbar.open('Profile Image Updated Successfull', undefined, {
              duration: 2000
            });

          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.studentSubscription?.unsubscribe();
    this.genderSubscription?.unsubscribe();
    this.updateStudentSubscription?.unsubscribe();
    this.deleteStudentSubscription?.unsubscribe();
    this.addStudentSubscription?.unsubscribe();
    this.uploadImageSubscription?.unsubscribe();
  }


}
