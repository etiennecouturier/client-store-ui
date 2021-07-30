import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {PhotoService} from './services/photo.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'app';
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

  ngOnChanges(): void {
    console.log('called');
    this.getImageFromService();
  }

  userLoggedIn() {
    return this.authService.isLoggedIn();
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
      console.log('error');
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
