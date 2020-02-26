import {Component, OnInit} from '@angular/core';
import {AuthService} from '@app/core/services/auth.service';
import {User} from '@app/shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
    this.observeUser();
  }

  ngOnInit() {
  }

  observeUser() {
    this.authService.currentUser$.subscribe(res => {
      this.user = res;
    });
  }

  logout() {
    this.authService.logout();
  }
}
