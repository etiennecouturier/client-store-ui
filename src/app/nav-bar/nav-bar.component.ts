import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PhotoService} from '../services/photo.service';
import {DomSanitizer} from '@angular/platform-browser';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  // TODO for action find another way
  navLinks = [
    {location: '/clients', label: 'ügyfelek', icon: 'person', action: () => {}},
    {location: '/stats', label: 'statisztikák', icon: 'bar_chart', action: () => {}},
    {location: '/login', label: 'kijelentkezés', icon: 'logout', action: () => this.authService.removeAccessToken()}
  ];
  imageToShow: any;
  mobile: boolean;

  constructor(private authService: AuthService,
              private photoService: PhotoService,
              private sanitizer: DomSanitizer,
              private deviceService: DeviceDetectorService) {
  }

  ngOnInit(): void {
    this.getImageFromService();
    this.mobile = this.deviceService.isMobile();
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
