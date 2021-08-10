import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PhotoService} from '../services/photo.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // TODO for action find another way
  navLinks = [
    {location: '/clients', label: 'ügyfelek', icon: 'person', action: () => {}},
    {location: '/stats', label: 'statisztikák', icon: 'check_circle', action: () => {}},
    {location: '/login', label: 'kijelentkezés', icon: 'logout', action: () => this.authService.removeAccessToken()}
  ];
  imageToShow: any;

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
    this.photoService
      .findPhotoByUserName(this.getUser())
      .subscribe(data => {
        this.createImageFromBlob(data);
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
