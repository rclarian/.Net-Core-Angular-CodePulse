import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit, OnDestroy {

  private file?: File;
  fileName: string = '';
  title: string = '';
  imageSubscription?: Subscription;
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService){

  }
  
  onFileUploadChange(event: Event): void {
    const element = event?.currentTarget as HTMLInputElement;
    this.file = element?.files?.[0];
  }

  uploadImage():void{
    if(this.file && this.fileName !== '' && this.title !== ''){
      //Image service to upload the image
      this.imageSubscription = this.imageService.uploadImage(this.file, this.fileName, this.title)
        .subscribe({
          next: (res) => {
            this.imageUploadForm?.resetForm();
            this.getImages();
          },
          error: (err) => {
            console.log('Error on Upload Image: ' + err);
          }
        });
    }
  }

  selectImage(image: BlogImage): void{
    this.imageService.selectImage(image);
  }

  ngOnInit(): void {
    this.getImages();
  }

  private getImages(){
    this.images$ = this.imageService.getAllImages();
  }

  ngOnDestroy(): void {
    this.imageSubscription?.unsubscribe();
  }

}
