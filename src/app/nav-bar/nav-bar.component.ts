import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PhotoService} from '../services/photo.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navLinks = [
    {location: '/clients', label: 'ügyfelek', icon: 'person'},
    {location: '/stats', label: 'statisztikák', icon: 'check_circle'},
    {location: '/login', label: 'kijelentkezés', icon: 'logout', action: () => this.authService.logout()}
  ];
  imageToShow: any;
  isImageLoading: any;

  constructor(private authService: AuthService,
              private photoService: PhotoService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getImageFromService();
  }

  getUser() {
    return this.authService.getUser();
  }

  // https://stackoverflow.com/questions/45530752/getting-image-from-api-in-angular-4-5
  getImageFromService() {
    this.isImageLoading = true;
    this.photoService.findPhotoByUserName(this.getUser()).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(`${reader.result}`);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
